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
              Match Netflix Shows
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Test your Netflix knowledge! Match shows with their descriptions and compete for the highest score.
            </p>
            <Link
              href="/game"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Play Now
            </Link>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How to Play
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-semibold text-white mb-2">Match Shows</h3>
                <p className="text-gray-300">
                  Drag and drop Netflix shows to match them with their correct descriptions.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-semibold text-white mb-2">Score Points</h3>
                <p className="text-gray-300">
                  Get points for correct matches. The faster you match, the higher your score!
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-semibold text-white mb-2">Compete</h3>
                <p className="text-gray-300">
                  Compare your scores with other players on the global leaderboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                More Game Modes
              </h3>
              <p className="text-gray-300">
                New challenging game modes including timed matches, difficulty levels, and themed categories.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Multiplayer Challenges
              </h3>
              <p className="text-gray-300">
                Challenge your friends to head-to-head matches and compete in real-time tournaments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
