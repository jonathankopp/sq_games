import { create } from 'zustand';

interface Show {
  id: string;
  title: string;
  description: string;
}

interface GameState {
  shows: Show[];
  userMatches: Record<string, string>; // showId -> descriptionId
  score: number;
  timeElapsed: number;
  incorrectMatches: number;
  isGameStarted: boolean;
  isGameComplete: boolean;
  
  // Actions
  setShows: (shows: Show[]) => void;
  setMatch: (showId: string, descriptionId: string) => void;
  removeMatch: (showId: string) => void;
  setScore: (score: number) => void;
  incrementIncorrectMatches: () => void;
  updateTimeElapsed: (time: number) => void;
  startGame: () => void;
  completeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  shows: [],
  userMatches: {},
  score: 0,
  timeElapsed: 0,
  incorrectMatches: 0,
  isGameStarted: false,
  isGameComplete: false,

  setShows: (shows) => set({ shows }),
  
  setMatch: (showId, descriptionId) => 
    set((state) => ({
      userMatches: { ...state.userMatches, [showId]: descriptionId }
    })),
  
  removeMatch: (showId) =>
    set((state) => {
      const newMatches = { ...state.userMatches };
      delete newMatches[showId];
      return { userMatches: newMatches };
    }),
  
  setScore: (score) => set({ score }),
  
  incrementIncorrectMatches: () => 
    set((state) => ({ incorrectMatches: state.incorrectMatches + 1 })),
  
  updateTimeElapsed: (time) => set({ timeElapsed: time }),
  
  startGame: () => set({ 
    isGameStarted: true, 
    timeElapsed: 0, 
    score: 0,
    incorrectMatches: 0 
  }),
  
  completeGame: () => set({ isGameComplete: true }),
  
  resetGame: () => set({
    userMatches: {},
    score: 0,
    timeElapsed: 0,
    incorrectMatches: 0,
    isGameStarted: false,
    isGameComplete: false
  })
})); 