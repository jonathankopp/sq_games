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
    <div className="bg-blue-100 w-full py-3">
      <div className="max-w-4xl mx-auto px-4">
        {/* Single line header with back button and stats */}
        <div className="flex items-center">
          {/* Back button - just the arrow */}
          <Link href="/" className="text-black hover:text-gray-700 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          {/* Stats in one row */}
          <div className="flex-1 grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-xs font-bold text-black block">TIME</span>
              <span className="text-sm font-bold text-black block">{formatTime(timeElapsed)}</span>
            </div>
            
            <div>
              <span className="text-xs font-bold text-black block">ERRORS</span>
              <span className="text-sm font-bold text-black block">{incorrectMatches}</span>
            </div>
            
            <div>
              <span className="text-xs font-bold text-black block">SCORE</span>
              <span className="text-sm font-bold text-black block">{formatScore(score)}</span>
            </div>
          </div>
        </div>
      </div>

      {isGameComplete && (
        <div className="text-center mt-2">
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 font-bold text-xs"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 