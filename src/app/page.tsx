import Link from 'next/link';
import { Layout } from './components/layout/Layout';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SqGames
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience unique and engaging games crafted with care. Each game offers a fresh take on classic concepts.
            </p>
            <Link
              href="/game"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Play Now
            </Link>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      </section>

      {/* Featured Game Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Featured Game
          </h2>
          <div className="bg-gray-700 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">TV Show Match</h3>
            <p className="text-gray-300 mb-6">
              Test your knowledge of TV shows in this engaging matching game. Pair shows with their genres and compete for the highest score!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-600 rounded-lg p-4">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold text-white mb-2">Match & Score</h4>
                <p className="text-gray-300 text-sm">
                  Match shows with their correct genres to earn points
                </p>
              </div>
              <div className="bg-gray-600 rounded-lg p-4">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-lg font-semibold text-white mb-2">Time Bonus</h4>
                <p className="text-gray-300 text-sm">
                  Faster matches earn you bigger bonuses
                </p>
              </div>
              <div className="bg-gray-600 rounded-lg p-4">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-lg font-semibold text-white mb-2">Compete</h4>
                <p className="text-gray-300 text-sm">
                  Challenge others on the global leaderboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            More Games Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                New Game Categories
              </h3>
              <p className="text-gray-300">
                We're working on exciting new game categories that will test different skills and knowledge areas.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Multiplayer Modes
              </h3>
              <p className="text-gray-300">
                Challenge your friends directly in upcoming real-time multiplayer games.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
