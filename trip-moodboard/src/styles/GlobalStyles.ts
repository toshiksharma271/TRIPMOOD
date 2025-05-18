import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
 :root {
  --bg-primary: #A9D6E5;       /* soft sky blue */
  --bg-secondary:rgb(151, 196, 231);     /* vibrant light blue */
  --bg-tertiary:rgb(183, 215, 241);      /* deeper light blue */
  --text-primary: #1C3F52;     /* dark slate blue */
  --text-secondary: #52796F;   /* muted teal */
  --border-color: rgba(76, 175, 240, 0.3); /* soft blue border */
  --shadow-color: rgba(0, 123, 255, 0.2);  /* soft blue shadow */
  --sticker-bg: rgba(164, 214, 255, 0.85); /* pale blue */
  --box-bg: rgba(126, 204, 235, 0.36);      /* translucent white */
  --box-border: rgba(78, 147, 203, 0.3);  /* light blue border */
}

  [data-theme='dark'] {
  --bg-primary: #121627;       /* almost black with blue tint */
  --bg-secondary: #1F2937;     /* dark slate blue */
  --bg-tertiary: #374151;      /* cool dark gray-blue */
  --text-primary: #E0E0E0;     /* soft light gray */
  --text-secondary: #9CA3AF;   /* muted silver */
  --border-color: rgba(147, 197, 253, 0.3); /* soft sky blue */
  --shadow-color: rgba(56, 189, 248, 0.3);  /* subtle blue glow */
  --sticker-bg: rgba(31, 41, 55, 0.85);     /* dark translucent */
  --box-bg: rgba(31, 41, 55, 0.9);          /* dark translucent */
  --box-border: rgba(147, 197, 253, 0.5);   /* gentle sky blue */
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