'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatScore } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: string;
}

// Mock data until API is ready
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'NetflixPro',
    score: 5800,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
  },
  {
    id: '2',
    username: 'BingeWatcher',
    score: 5200,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
  },
  {
    id: '3',
    username: 'SeriesExpert',
    score: 4900,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: '4',
    username: 'ShowMaster',
    score: 4500,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
  },
  {
    id: '5',
    username: 'StreamingKing',
    score: 4200,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
  }
];

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call when ready
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (page === 1) {
        setLeaderboard(MOCK_LEADERBOARD);
        setHasMore(false); // No more mock data
      }
      
      setError(null);
    } catch {
      setError('Failed to load leaderboard data');
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-100/10 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={fetchLeaderboard}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Top Players
      </h2>

      {isLoading && page === 1 ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-400 w-8">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{entry.username}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-yellow-400">
                  {formatScore(entry.score)}
                </span>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          {leaderboard.length === 0 && !isLoading && (
            <div className="text-center text-gray-400 py-8">
              No scores recorded yet. Be the first to play!
            </div>
          )}
        </>
      )}
    </div>
  );
} 