'use client';

import { useEffect, useState } from 'react';
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
    <div className="min-h-screen flex flex-col bg-white">
      <GameStatus />
      
      <div className="max-w-6xl mx-auto px-4 w-full flex-grow py-5">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg">
            <p className="text-xs">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-1 bg-black text-white rounded-md hover:bg-gray-800 text-xs"
            >
              Try Again
            </button>
          </div>
        ) : shows.length > 0 ? (
          <GameBoard shows={shows} />
        ) : null}
      </div>
    </div>
  );
} 