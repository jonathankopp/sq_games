'use client';

import { useState, useEffect } from 'react';
import { ShowCard } from './ShowCard';
import { ArrowDownIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Show {
  id: string;
  title: string;
  description: string;
}

interface Match {
  showId: string;
  descriptionId: string;
  isMatched: boolean;
  isCorrect: boolean;
  showShakeAnimation?: boolean;
}

interface GameBoardProps {
  shows: Show[];
}

export function GameBoard({ shows }: GameBoardProps) {
  const [userMatches, setUserMatches] = useState<Match[]>([]);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [selectedDescriptionId, setSelectedDescriptionId] = useState<string | null>(null);
  const [shuffledDescriptions, setShuffledDescriptions] = useState<Array<{ id: string; description: string }>>([]);

  useEffect(() => {
    // Initialize and shuffle descriptions when shows change
    if (shows.length > 0) {
      const descriptions = shows.map(show => ({ 
        id: show.id, 
        description: show.description 
      }));
      setShuffledDescriptions([...descriptions].sort(() => Math.random() - 0.5));
    }
  }, [shows]);

  const handleShowSelect = (showId: string) => {
    setSelectedShowId(showId === selectedShowId ? null : showId);
    if (selectedDescriptionId) {
      handleMatch(showId, selectedDescriptionId);
      setSelectedDescriptionId(null);
    }
  };

  const handleDescriptionSelect = (descriptionId: string) => {
    setSelectedDescriptionId(descriptionId === selectedDescriptionId ? null : descriptionId);
    if (selectedShowId) {
      handleMatch(selectedShowId, descriptionId);
      setSelectedShowId(null);
    }
  };

  const handleMatch = (showId: string, descriptionId: string) => {
    const isCorrect = showId === descriptionId;
    
    if (isCorrect) {
      setUserMatches(prev => [
        ...prev,
        {
          showId,
          descriptionId,
          isMatched: true,
          isCorrect: true
        }
      ]);
    } else {
      setUserMatches(prev => [
        ...prev,
        {
          showId,
          descriptionId,
          isMatched: true,
          isCorrect: false,
          showShakeAnimation: true
        }
      ]);
      
      // Remove incorrect match after animation
      setTimeout(() => {
        setUserMatches(prev => prev.filter(match => match.showId !== showId));
      }, 1000);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 md:space-y-12">
      {/* Instructions */}
      <div className="text-center space-y-1 md:space-y-2">
        <h1 className="text-sm md:text-xl font-semibold text-white">Match the Netflix Shows!</h1>
        <p className="text-[10px] md:text-sm text-gray-400">
          Drag or click to match each Netflix show with its genre tags. Match all pairs to win!
        </p>
      </div>

      {/* Shows Section */}
      <div className="space-y-2 md:space-y-4">
        <h2 className="text-xs md:text-lg font-medium text-gray-300">
          <span className="inline-block w-5 h-5 md:w-6 md:h-6 text-[10px] md:text-sm bg-purple-500/20 rounded-full mr-2 flex items-center justify-center">1</span>
          Netflix Shows
        </h2>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {shows.map((show) => {
            const match = userMatches.find(m => m.showId === show.id);
            return (
              <ShowCard
                key={show.id}
                id={show.id}
                title={show.title}
                type="show"
                isMatched={match?.isMatched}
                isCorrect={match?.isCorrect}
                isSelected={selectedShowId === show.id}
                onSelect={() => handleShowSelect(show.id)}
                showShakeAnimation={match?.showShakeAnimation}
              />
            );
          })}
        </div>
      </div>

      {/* Visual Separator */}
      <div className="flex flex-col items-center space-y-1 md:space-y-2">
        <div className="w-1/2 border-t border-gray-700" />
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDownIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-500" />
        </motion.div>
      </div>

      {/* Descriptions Section */}
      <div className="space-y-2 md:space-y-4">
        <h2 className="text-xs md:text-lg font-medium text-gray-300">
          <span className="inline-block w-5 h-5 md:w-6 md:h-6 text-[10px] md:text-sm bg-gray-500/20 rounded-full mr-2 flex items-center justify-center">2</span>
          Genre Tags
        </h2>
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {shuffledDescriptions.map((desc) => {
            const match = userMatches.find(m => m.descriptionId === desc.id);
            return (
              <ShowCard
                key={desc.id}
                id={desc.id}
                title={desc.description}
                type="description"
                isMatched={match?.isMatched}
                isCorrect={match?.isCorrect}
                isSelected={selectedDescriptionId === desc.id}
                onSelect={() => handleDescriptionSelect(desc.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 