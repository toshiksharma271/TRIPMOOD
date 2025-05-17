import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Sticker } from '../utils/stickersData';

interface PlacedSticker extends Sticker {
  id: string;
  position: { x: number; y: number };
  size: number;
  rotation: number;
  time: string;
  zIndex: number;
}

interface MoodboardState {
  stickers: PlacedSticker[];
  selectedTime: string;
  history: PlacedSticker[][];
  historyIndex: number;
  selectedSticker: string | null;
}

type Action =
  | { type: 'ADD_STICKER'; payload: PlacedSticker }
  | { type: 'UPDATE_STICKER'; payload: { id: string; updates: Partial<PlacedSticker> } }
  | { type: 'DELETE_STICKER'; payload: string }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'SELECT_STICKER'; payload: string | null }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const initialState: MoodboardState = {
  stickers: [],
  selectedTime: '12:00',
  history: [[]],
  historyIndex: 0,
  selectedSticker: null,
};

const MoodboardContext = createContext<{
  state: MoodboardState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const moodboardReducer = (state: MoodboardState, action: Action): MoodboardState => {
  switch (action.type) {
    case 'ADD_STICKER': {
      const newStickers = [...state.stickers, action.payload];
      return {
        ...state,
        stickers: newStickers,
        history: [...state.history.slice(0, state.historyIndex + 1), newStickers],
        historyIndex: state.historyIndex + 1,
      };
    }
    case 'UPDATE_STICKER': {
      const newStickers = state.stickers.map(sticker =>
        sticker.id === action.payload.id
          ? { ...sticker, ...action.payload.updates }
          : sticker
      );
      return {
        ...state,
        stickers: newStickers,
        history: [...state.history.slice(0, state.historyIndex + 1), newStickers],
        historyIndex: state.historyIndex + 1,
      };
    }
    case 'DELETE_STICKER': {
      const newStickers = state.stickers.filter(sticker => sticker.id !== action.payload);
      return {
        ...state,
        stickers: newStickers,
        history: [...state.history.slice(0, state.historyIndex + 1), newStickers],
        historyIndex: state.historyIndex + 1,
      };
    }
    case 'SET_TIME':
      return { ...state, selectedTime: action.payload };
    case 'SELECT_STICKER':
      return { ...state, selectedSticker: action.payload };
    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          stickers: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          stickers: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;
    default:
      return state;
  }
};

export const MoodboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(moodboardReducer, initialState);

  return (
    <MoodboardContext.Provider value={{ state, dispatch }}>
      {children}
    </MoodboardContext.Provider>
  );
};

export const useMoodboard = () => {
  const context = useContext(MoodboardContext);
  if (!context) {
    throw new Error('useMoodboard must be used within a MoodboardProvider');
  }
  return context;
}; 