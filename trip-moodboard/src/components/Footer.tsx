import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 24px;
  height: 100%;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: white;
  color: #2c3e50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ExportButton = styled(Button)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`;

const Footer: React.FC = () => {
  const handleExport = async () => {
    const canvas = document.querySelector('.canvas-area');
    if (!canvas) return;

    try {
      const screenshot = await html2canvas(canvas as HTMLElement);
      const link = document.createElement('a');
      link.download = 'moodboard.png';
      link.href = screenshot.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting moodboard:', error);
    }
  };

  return (
    <FooterContainer>
      <Button disabled>
        <span>↩️</span>
        Undo
      </Button>
      <Button disabled>
        <span>↪️</span>
        Redo
      </Button>
      <ExportButton onClick={handleExport}>
        <span>💾</span>
        Export
      </ExportButton>
    </FooterContainer>
  );
};

export default Footer;
