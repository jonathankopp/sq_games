'use client';

import { useGameStore } from '@/store/gameStore';
import { formatScore } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function GameStatus() {
  const { score, timeElapsed, incorrectMatches = 0, isGameComplete } = useGameStore();

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-blue-100 w-full">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <div className="py-2">
          <Link href="/" className="inline-flex items-center text-black hover:text-gray-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Back to Games</span>
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 text-center py-6">
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-1">TIME</h3>
            <p className="text-2xl md:text-4xl font-bold text-black">
              {formatTime(timeElapsed)}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-1">ERRORS</h3>
            <p className="text-2xl md:text-4xl font-bold text-black">
              {incorrectMatches}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-1">SCORE</h3>
            <p className="text-2xl md:text-4xl font-bold text-black">
              {formatScore(score)}
            </p>
          </div>
        </div>
      </div>

      {isGameComplete && (
        <div className="text-center pb-4">
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 font-bold"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 