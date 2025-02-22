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
    title: 'Stranger Things',
    description: 'Supernatural • Teen • Horror'
  },
  {
    id: '2',
    title: 'The Crown',
    description: 'Historical • Drama • Political'
  },
  {
    id: '3',
    title: 'Bridgerton',
    description: 'Romance • Period • Scandalous'
  },
  {
    id: '4',
    title: 'Squid Game',
    description: 'Thriller • Survival • Dark'
  },
  {
    id: '5',
    title: 'Wednesday',
    description: 'Gothic • Teen • Mystery'
  },
  {
    id: '6',
    title: 'Black Mirror',
    description: 'Dystopian • Tech • Twisted'
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
          Match Netflix Shows
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <GameStatus />
          <GameBoard />
        </div>
      </div>
    </Layout>
  );
} 