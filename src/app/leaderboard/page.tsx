'use client';

import { Layout } from '../components/layout/Layout';
import { Leaderboard } from '../components/game/Leaderboard';

export default function LeaderboardPage() {
  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Leaderboard
        </h1>
        <Leaderboard />
      </div>
    </Layout>
  );
} 