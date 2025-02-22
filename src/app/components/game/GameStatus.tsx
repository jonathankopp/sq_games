'use client';

import { useGameStore } from '@/store/gameStore';
import { formatScore } from '@/lib/utils';

export function GameStatus() {
  const { score, timeElapsed, isGameComplete } = useGameStore();

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Score</h3>
          <p className="text-2xl font-bold text-yellow-400">
            {formatScore(score)}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Time</h3>
          <p className={`text-2xl font-bold ${isGameComplete ? 'text-green-400' : 'text-white'}`}>
            {formatTime(timeElapsed)}
          </p>
        </div>
      </div>

      {isGameComplete && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            Game Complete!
          </h3>
          <p className="text-gray-300">
            Final Score: {formatScore(score)}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 