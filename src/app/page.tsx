import Link from 'next/link';
import { CountdownTimer } from './components/CountdownTimer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header Bar with Countdown and Logo */}
      <header className="bg-blue-100 py-2 md:py-4 px-3 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-bold text-sm md:text-2xl mr-2 md:mr-4 text-black">
            Games Refresh in:
          </div>
          <CountdownTimer targetHour={0} targetMinute={0} targetTimezone="America/New_York" />
        </div>         

        {/* Right side with cat and profile */}
        <div className="flex items-center">
          <div className="relative">
            <img src="/cat-martini.png" alt="Cat with martini" className="h-12 md:h-24 object-contain" />
          </div>
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center overflow-hidden ml-2 md:ml-4">
            <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-4 md:py-8 px-3 md:px-6 max-w-5xl mx-auto w-full">
        <div className="space-y-3 md:space-y-4">
          {/* Genre Match Game Card */}
          <div className="bg-pink-100 rounded-2xl md:rounded-3xl p-3 md:p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-black">GENRE MATCH</h2>
              <p className="text-xs md:text-base text-black mb-3 md:mb-6">
                Match TV shows and Movies to their correct genres in this fast-paced challenge
              </p>
              <div className="mt-2 md:mt-4">
                <Link
                  href="/game"
                  className="inline-block bg-pink-500 text-white px-4 md:px-6 py-1 md:py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-pink-600 transition-colors"
                >
                  Play Now
                </Link>
              </div>
            </div>
            <div className="ml-2 md:ml-4">
              <img src="/clapperboard.png" alt="Clapperboard" className="h-20 w-20 md:h-28 md:w-28 object-contain" />
            </div>
          </div>

          {/* Broadlinks Game Card */}
          <div className="bg-purple-100 rounded-2xl md:rounded-3xl p-3 md:p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-black">BROADLINKS</h2>
              <p className="text-xs md:text-base text-black mb-3 md:mb-6">
                Group Broadway shows into categories and find the connections in this theatrical puzzle
              </p>
              <div className="mt-2 md:mt-4">
                <button
                  disabled
                  className="inline-block bg-gray-400 text-white px-4 md:px-6 py-1 md:py-2 rounded-lg text-sm md:text-base font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
            <div className="ml-2 md:ml-4">
              <img src="/broadway.png" alt="Broadway" className="h-20 w-20 md:h-28 md:w-28 object-contain" />
            </div>
          </div>

          {/* Cinema Chain Game Card */}
          <div className="bg-yellow-100 rounded-2xl md:rounded-3xl p-3 md:p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-black">CINEMA CHAIN or<br />HOLLYWOOD LINK</h2>
              <p className="text-xs md:text-base text-black mb-3 md:mb-6">
                Connect the first actor to the last in the fewest steps by linking them through shared movies and co-stars.
              </p>
              <div className="mt-2 md:mt-4">
                <button
                  disabled
                  className="inline-block bg-gray-400 text-white px-4 md:px-6 py-1 md:py-2 rounded-lg text-sm md:text-base font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
            <div className="ml-2 md:ml-4">
              <img src="/popcorn.png" alt="Popcorn" className="h-20 w-20 md:h-28 md:w-28 object-contain" />
            </div>
          </div>

          {/* Reverse Crossword Game Card */}
          <div className="bg-green-100 rounded-2xl md:rounded-3xl p-3 md:p-6 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-black">REVERSE<br />CROSSWORD</h2>
              <p className="text-xs md:text-base text-black mb-3 md:mb-6">
                The answers are already in place, so it&apos;s up to you to come up with the clues
              </p>
              <div className="mt-2 md:mt-4">
                <button
                  disabled
                  className="inline-block bg-gray-400 text-white px-4 md:px-6 py-1 md:py-2 rounded-lg text-sm md:text-base font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
            <div className="ml-2 md:ml-4">
              <img src="/crossword.png" alt="Crossword" className="h-12 w-12 md:h-20 md:w-20 object-contain" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
