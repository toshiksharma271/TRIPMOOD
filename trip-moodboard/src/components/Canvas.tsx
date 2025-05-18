import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Draggable from 'react-draggable';
import { useMoodboard } from '../context/MoodboardContext';
import { Sticker } from './stickersData';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(60px) rotate(50deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
`;

const CanvasContainer = styled.div`
  flex: 1;
  position: relative;
  background-color: var(--bg-primary);
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CanvasArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  width: 100%;
  height: 100%;
`;

const BackgroundBox = styled.div<{
  size: number;
  delay: number;
  x: number;
  y: number;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: radial-gradient(circle, var(--box-bg) 0%, var(--box-border) 100%);
  border: 2px solid var(--box-border);
  border-radius: 12px;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  animation: 
    ${float} 14s cubic-bezier(0.45, 0, 0.55, 1) infinite,
    ${pulse} 10s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  will-change: transform;

 &:hover {
  animation-play-state: paused;
  transform: scale(1.1) rotate(25deg);
  box-shadow: 0 8px 32px rgba(115, 151, 190, 0.6);
  cursor: pointer;
}
  

  &:active {
    transform: scale(0.95) rotate(-15deg);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const StickerWrapper = styled.div<{ isHighlighted: boolean }>`
  position: absolute;
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: ${({ isHighlighted }) => (isHighlighted ? 1 : 0.7)};
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
  width: 100px;
  height: 100px;
  background: var(--sticker-bg);
  border-radius: 12px;
  box-shadow: 0 4px 14px var(--shadow-color);
  padding: 12px;
  transform-origin: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px var(--shadow-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px var(--shadow-color));
    transition: opacity 0.3s ease;
  }
`;

const TimeLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--sticker-bg);
  padding: 4px 8px;
  border-radius: 6px;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  box-shadow: 0 2px 6px var(--shadow-color);
  font-weight: 500;
  backdrop-filter: blur(4px);
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Canvas: React.FC = () => {
  const { state, dispatch } = useMoodboard();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  const [backgroundBoxes, setBackgroundBoxes] = useState<
    Array<{ size: number; delay: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const boxes = Array.from({ length: 15 }, () => ({
      size: Math.random() * 80 + 60,
      delay: Math.random() * 5,
      x: Math.random() * 90,
      y: Math.random() * 90,
    }));
    setBackgroundBoxes(boxes);
  }, []);

  useEffect(() => {
    setLoadingImages((prev) => {
      const newLoading = { ...prev };
      state.stickers.forEach((sticker) => {
        if (!(sticker.id in newLoading)) {
          newLoading[sticker.id] = true;
        }
      });
      return newLoading;
    });
  }, [state.stickers]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const stickerData = e.dataTransfer.getData('application/json');
    if (!stickerData) return;

    const sticker: Sticker = JSON.parse(stickerData);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 50;

    const newSticker = {
      ...sticker,
      id: `${sticker.id}-${Date.now()}`,
      position: { x, y },
      size: 100,
      rotation: 0,
      time: state.selectedTime,
      zIndex: state.stickers.length,
    };

    dispatch({ type: 'ADD_STICKER', payload: newSticker });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrag = (data: any, stickerId: string) => {
    const { x, y } = data;
    dispatch({
      type: 'UPDATE_STICKER',
      payload: {
        id: stickerId,
        updates: { position: { x, y } },
      },
    });
  };

  const handleImageLoad = (stickerId: string) => {
    setLoadingImages((prev) => ({ ...prev, [stickerId]: false }));
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    stickerId: string
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/2753.png';
    setLoadingImages((prev) => ({ ...prev, [stickerId]: false }));
  };

  return (
    <CanvasContainer>
      <CanvasArea
        ref={canvasRef}
        className="canvas-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {backgroundBoxes.map((box, index) => (
          <BackgroundBox
            key={index}
            size={box.size}
            delay={box.delay}
            x={box.x}
            y={box.y}
          />
        ))}

        {state.stickers
          .filter((sticker) => sticker.time === state.selectedTime)
          .map((sticker) => (
            <Draggable
              key={sticker.id}
              position={sticker.position}
              onDrag={(e, data) => handleDrag(data, sticker.id)}
              bounds="parent"
            >
              <StickerWrapper
                isHighlighted={sticker.time === state.selectedTime}
                style={{
                  transform: `rotate(${sticker.rotation}deg)`,
                  zIndex: sticker.zIndex,
                }}
              >
                {loadingImages[sticker.id] && <LoadingSpinner />}
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  onLoad={() => handleImageLoad(sticker.id)}
                  onError={(e) => handleImageError(e, sticker.id)}
                  style={{ display: loadingImages[sticker.id] ? 'none' : 'block' }}
                />
                <TimeLabel>{sticker.time}</TimeLabel>
              </StickerWrapper>
            </Draggable>
          ))}
      </CanvasArea>
    </CanvasContainer>
  );
};

export default Canvas;
