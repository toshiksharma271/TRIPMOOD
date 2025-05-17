import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import { MoodboardProvider } from './context/MoodboardContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

const AppContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 40px;
  height: 100vh;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: var(--bg-primary);
  overflow: hidden;
  transition: background-color 0.3s ease;
`;

const HeaderArea = styled.header`
  grid-area: header;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
`;

const SidebarArea = styled.aside`
  grid-area: sidebar;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px var(--shadow-color);
  overflow-y: auto;
  max-height: calc(100vh - 110px);
`;

const MainArea = styled.main`
  grid-area: main;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px var(--shadow-color);
  overflow: hidden;

  > *:last-child {
    margin-top: 1rem;
  }
`;

const FooterArea = styled.footer`
  grid-area: footer;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px var(--shadow-color);
  }
`;

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            break;
          case 'y':
            e.preventDefault();
            break;
          case 's':
            e.preventDefault();
            break;
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AppContainer>
      <HeaderArea>
        <Header />
      </HeaderArea>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <MainArea>
        <ThemeToggle onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </ThemeToggle>
        <Canvas />
        <Timeline /> {/* 👈 Timeline now lives under Canvas in the main section */}
      </MainArea>
      <FooterArea>
        <Footer />
      </FooterArea>
    </AppContainer>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MoodboardProvider>
        <GlobalStyles />
        <AppContent />
      </MoodboardProvider>
    </ThemeProvider>
  );
};

export default App;
