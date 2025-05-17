import React from 'react';
import styled from 'styled-components';
import { useMoodboard } from '../context/MoodboardContext';

const TimelineContainer = styled.div`
  grid-area: timeline;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
`;

const TimelineBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background-color: var(--bg-tertiary);
  border-radius: 24px;
  position: relative;
`;

const TimeButton = styled.button<{ selected: boolean }>`
  background: ${({ selected }) => (selected ? 'var(--bg-primary)' : 'transparent')};
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ selected }) => (selected ? '0 2px 8px var(--shadow-color)' : 'none')};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: var(--bg-primary);
    transform: translateY(-2px);
  }
`;

const StickerCount = styled.span`
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1.5px solid var(--border-color);
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 600;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -8px;
  box-shadow: 0 1px 4px var(--shadow-color);
`;

const Timeline: React.FC = () => {
  const { state, dispatch } = useMoodboard();
  const times = ['00:00','01:00', '03:00', '06:00', '09:00', '12:00','06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

  const handleTimeClick = (time: string) => {
    dispatch({ type: 'SET_TIME', payload: time });
  };

  const getStickerCount = (time: string) => {
    return state.stickers.filter(sticker => sticker.time === time).length;
  };

  return (
    <TimelineContainer>
      <TimelineBar>
        {times.map(time => (
          <TimeButton
            key={time}
            selected={state.selectedTime === time}
            onClick={() => handleTimeClick(time)}
          >
            {time}
            {getStickerCount(time) > 0 && (
              <StickerCount>{getStickerCount(time)}</StickerCount>
            )}
          </TimeButton>
        ))}
      </TimelineBar>
    </TimelineContainer>
  );
};

export default Timeline; 