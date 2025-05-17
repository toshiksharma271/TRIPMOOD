import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme variables */
    --bg-primary: #ffffff;
    --bg-secondary: #f5f7fa;
    --bg-tertiary: #e4e8eb;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: rgba(0, 0, 0, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.1);
    --sticker-bg: rgba(255, 255, 255, 0.95);
    --box-bg: rgba(255, 255, 255, 0.1);
    --box-border: rgba(255, 255, 255, 0.2);
  }

  [data-theme='dark'] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --bg-tertiary: #3d3d3d;
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --border-color: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.3);
    --sticker-bg: rgba(45, 45, 45, 0.95);
    --box-bg: rgba(255, 255, 255, 0.05);
    --box-border: rgba(255, 255, 255, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input {
    font-family: inherit;
    border: none;
    outline: none;
  }

  .sticker {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    &.highlighted {
      transform: scale(1.1);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
      border: 2px solid #3b82f6;
    }
  }

  .dragging {
    opacity: 0.8;
    transform: scale(1.1);
    z-index: 1000;
  }
`; 