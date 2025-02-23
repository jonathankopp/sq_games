'use client';

import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { GameBoard } from '../components/game/GameBoard';
import { GameStatus } from '../components/game/GameStatus';
import { useGameStore } from '@/store/gameStore';

interface Show {
  title: string;
  description: string;
}

interface APIResponse {
  shows: Show[];
}

export default function GamePage() {
  const { shows, setShows, startGame, isGameStarted } = useGameStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://sq-games-backend.onrender.com/api/games/tv-match/shows');
        
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }

        const data: APIResponse = await response.json();
        
        // Transform the data to match our format
        const formattedShows = data.shows.map((show, index) => ({
          id: String(index + 1),
          title: show.title,
          description: show.description.replace(/`/g, '') // Remove backticks if present
        }));

        setShows(formattedShows);
        if (!isGameStarted) {
          startGame();
        }
        setError(null);
      } catch (err) {
        setError('Failed to load game data. Please try again.');
        console.error('Error fetching shows:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, [setShows, startGame, isGameStarted]);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Match the Shows
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <GameStatus />
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4 bg-red-100/10 rounded-lg">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Try Again
              </button>
            </div>
          ) : shows.length > 0 ? (
            <GameBoard shows={shows} />
          ) : null}
        </div>
      </div>
    </Layout>
  );
} 