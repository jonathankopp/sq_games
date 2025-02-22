import { useState, useEffect } from 'react';
import { formatScore } from '@/lib/utils';

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  timestamp: string;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/leaderboard?page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      
      const data = await response.json();
      setLeaderboard(prev => page === 1 ? data.entries : [...prev, ...data.entries]);
      setHasMore(data.hasMore);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
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
        </>
      )}
    </div>
  );
} 