import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { useMoodboard } from '../context/MoodboardContext';
import { Sticker } from './stickersData';

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
  // blue background for better visibility light blue
  background: linear-gradient(135deg,rgb(13, 202, 227) 0%,rgb(0, 184, 208) 100%);
  overflow: hidden;
`;

const StickerWrapper = styled.div<{ isHighlighted: boolean }>`
  position: absolute;
  cursor: move;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: ${props => props.isHighlighted ? 1 : 0.5};
  transition: opacity 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TimeLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  background: linear-gradient(135deg,rgb(11, 199, 224) 0%,rgb(1, 216, 245) 100%);
  padding: 2px 6px;
  border-radius: 4px;
`;

const MoodboardCanvas: React.FC = () => {
  const { state, dispatch } = useMoodboard();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const stickerData = e.dataTransfer.getData('application/json');
    if (!stickerData) return;

    const sticker: Sticker = JSON.parse(stickerData);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSticker = {
      ...sticker,
      id: `${sticker.id}-${Date.now()}`,
      position: { x, y },
      size: 100,
      rotation: 0,
      time: state.selectedTime,
      zIndex: state.stickers.length
    };

    dispatch({ type: 'ADD_STICKER', payload: newSticker });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrag = (e: any, stickerId: string) => {
    const { x, y } = e;
    dispatch({
      type: 'UPDATE_STICKER',
      payload: {
        id: stickerId,
        updates: { position: { x, y } }
      }
    });
  };

  return (
    <CanvasContainer
      ref={canvasRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {state.stickers.map(sticker => (
        <Draggable
          key={sticker.id}
          position={sticker.position}
          onDrag={(e, data) => handleDrag(data, sticker.id)}
          bounds="parent"
        >
          <StickerWrapper
            isHighlighted={sticker.time === state.selectedTime}
            style={{
              width: sticker.size,
              height: sticker.size,
              transform: `rotate(${sticker.rotation}deg)`,
              zIndex: sticker.zIndex
            }}
          >
            <img src={sticker.image} alt={sticker.name} />
            <TimeLabel>{sticker.time}</TimeLabel>
          </StickerWrapper>
        </Draggable>
      ))}
    </CanvasContainer>
  );
};

export default MoodboardCanvas; 