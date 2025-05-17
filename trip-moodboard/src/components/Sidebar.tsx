import React from 'react';
import styled from 'styled-components';
import { useMoodboard } from '../context/MoodboardContext';
import { stickers, categories } from '../utils/stickersData';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-color);
`;

const CategorySection = styled.div`
  margin-bottom: 12px;
`;

const CategoryTitle = styled.h3`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StickersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 8px;
`;

const StickerItem = styled.div`
  aspect-ratio: 1;
  background: var(--sticker-bg);
  border-radius: 8px;
  padding: 8px;
  cursor: grab;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  margin: 4px;
  border: none;
  border-radius: 6px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-tertiary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionsContainer = styled.div`
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
`;

const Sidebar: React.FC = () => {
  const { state, dispatch } = useMoodboard();

  const handleDragStart = (e: React.DragEvent, sticker: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sticker));
  };

  const handleDeleteSelected = () => {
    if (state.selectedSticker) {
      dispatch({ type: 'DELETE_STICKER', payload: state.selectedSticker });
    }
  };

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  return (
    <SidebarContainer>
      {categories.map(category => (
        <CategorySection key={category.id}>
          <CategoryTitle>
            <span>{category.icon}</span>
            {category.name}
          </CategoryTitle>
          <StickersGrid>
            {stickers
              .filter(sticker => sticker.category === category.id)
              .map(sticker => (
                <StickerItem
                  key={sticker.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, sticker)}
                >
                  <img src={sticker.image} alt={sticker.name} />
                </StickerItem>
              ))}
          </StickersGrid>
        </CategorySection>
      ))}
      <ActionsContainer>
        <h3>Actions</h3>
        <ActionButton onClick={handleUndo} disabled={state.historyIndex === 0}>
          Undo
        </ActionButton>
        <ActionButton onClick={handleRedo} disabled={state.historyIndex === state.history.length - 1}>
          Redo
        </ActionButton>
        <ActionButton onClick={handleDeleteSelected} disabled={!state.selectedSticker}>
          Delete Selected
        </ActionButton>
      </ActionsContainer>
    </SidebarContainer>
  );
};

export default Sidebar; 