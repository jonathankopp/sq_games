'use client';

import { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { GameBoard } from '../components/game/GameBoard';
import { GameStatus } from '../components/game/GameStatus';
import { useGameStore } from '@/store/gameStore';

// Sample data - Replace with API call in production
const SAMPLE_SHOWS = [
  {
    id: '1',
    title: 'Breaking Bad',
    description: 'Crime • Drama • Thriller'
  },
  {
    id: '2',
    title: 'The Office',
    description: 'Comedy • Mockumentary • Workplace'
  },
  {
    id: '3',
    title: 'Game of Thrones',
    description: 'Fantasy • Drama • Epic'
  },
  {
    id: '4',
    title: 'Friends',
    description: 'Sitcom • Comedy • Relationships'
  },
  {
    id: '5',
    title: 'The Wire',
    description: 'Crime • Drama • Social'
  },
  {
    id: '6',
    title: 'Lost',
    description: 'Mystery • Adventure • Supernatural'
  }
];

export default function GamePage() {
  const { shows, setShows, startGame, isGameStarted } = useGameStore();

  useEffect(() => {
    // Initialize game with sample data
    if (!isGameStarted) {
      setShows(SAMPLE_SHOWS);
      startGame();
    }
  }, [isGameStarted, setShows, startGame]);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Match the Shows
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <GameStatus />
          {shows.length > 0 && <GameBoard shows={shows} />}
        </div>
      </div>
    </Layout>
  );
} 