import React from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import { useMoodboard } from '../context/MoodboardContext';
import { stickers, categories } from './stickersData';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-color);
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16px;
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
  grid-template-columns: repeat(2, 1fr); // you can change to 3 if you want smaller stickers
  gap: 8px;
  padding: 0 8px;
`;

const StickerItem = styled.div`
  aspect-ratio: 1;
  background: var(--sticker-bg);
  border-radius: 12px;
  padding: 6px;
  cursor: grab;
  box-shadow: 0 2px 6px var(--shadow-color);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px var(--shadow-color);
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const Sidebar: React.FC = () => {
  const { dispatch } = useMoodboard();

  const handleDragStart = (e: React.DragEvent, sticker: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify(sticker));
  };

  return (
    <SidebarContainer>
      <ScrollableContent>
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
                    onDragStart={e => handleDragStart(e, sticker)}
                  >
                    {sticker.lottie ? (
                      <Player
                        autoplay
                        loop
                        keepLastFrame
                        src={sticker.lottie}
                        style={{ width: '80%', height: '80%' }}
                      />
                    ) : sticker.image ? (
                      <img
                        src={sticker.image}
                        alt={sticker.name}
                        style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                      />
                    ) : null}
                  </StickerItem>
                ))}
            </StickersGrid>
          </CategorySection>
        ))}
      </ScrollableContent>
    </SidebarContainer>
  );
};

export default Sidebar;
