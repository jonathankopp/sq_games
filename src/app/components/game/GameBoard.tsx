'use client';

import { useState, useEffect } from 'react';
import { ShowCard } from './ShowCard';
import { useGameStore } from '@/store/gameStore';
import { calculateTimeBonus } from '@/lib/utils';

interface Show {
  id: string;
  title: string;
  description: string;
}

interface GameBoardProps {
  shows: Show[];
}

export function GameBoard({ shows }: GameBoardProps) {
  const { 
    score, 
    setScore,
    timeElapsed,
    updateTimeElapsed,
    incrementIncorrectMatches,
    completeGame,
    isGameComplete
  } = useGameStore();

  const [correctMatches, setCorrectMatches] = useState<Set<string>>(new Set());
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [selectedDescriptionId, setSelectedDescriptionId] = useState<string | null>(null);
  const [incorrectShowId, setIncorrectShowId] = useState<string | null>(null);
  const [shuffledDescriptions, setShuffledDescriptions] = useState<Array<{ id: string; description: string }>>([]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isGameComplete) {
      timer = setInterval(() => {
        updateTimeElapsed(timeElapsed + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeElapsed, isGameComplete, updateTimeElapsed]);

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

  const clearSelections = () => {
    setSelectedShowId(null);
    setSelectedDescriptionId(null);
  };

  const handleShowSelect = (showId: string) => {
    if (correctMatches.has(showId)) return; // Ignore if already matched
    if (incorrectShowId) return; // Ignore if showing incorrect animation
    
    setSelectedShowId(showId === selectedShowId ? null : showId);
    if (selectedDescriptionId) {
      handleMatch(showId, selectedDescriptionId);
    }
  };

  const handleDescriptionSelect = (descriptionId: string) => {
    if (correctMatches.has(descriptionId)) return; // Ignore if already matched
    if (incorrectShowId) return; // Ignore if showing incorrect animation
    
    setSelectedDescriptionId(descriptionId === selectedDescriptionId ? null : descriptionId);
    if (selectedShowId) {
      handleMatch(selectedShowId, descriptionId);
    }
  };

  const handleMatch = (showId: string, descriptionId: string) => {
    const isCorrect = showId === descriptionId;
    
    if (isCorrect) {
      // Add to correct matches
      const newMatches = new Set(correctMatches);
      newMatches.add(showId);
      setCorrectMatches(newMatches);
      
      // Update score - base score + time bonus
      const baseScore = 1000;
      const timeBonus = calculateTimeBonus(timeElapsed);
      setScore(score + baseScore + timeBonus);
      
      // Clear selections
      clearSelections();
      
      // Check if game is complete
      if (newMatches.size === shows.length) {
        completeGame();
      }
    } else {
      // Show incorrect animation only for the show card
      setIncorrectShowId(showId);
      
      // Apply score penalty (20% of current score or minimum of 100 points)
      const penalty = Math.max(Math.floor(score * 0.2), 100);
      setScore(Math.max(0, score - penalty));
      
      // Increment incorrect matches count
      incrementIncorrectMatches();
      
      // Clear after animation
      setTimeout(() => {
        setIncorrectShowId(null);
        clearSelections();
      }, 1000);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* TV Shows Section */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-center text-black">
          TV SHOWS & MOVIES
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {shows.map((show) => (
            <ShowCard
              key={show.id}
              id={show.id}
              title={show.title}
              type="show"
              isMatched={correctMatches.has(show.id)}
              isCorrect={correctMatches.has(show.id)}
              isSelected={selectedShowId === show.id}
              showShakeAnimation={incorrectShowId === show.id}
              onSelect={() => handleShowSelect(show.id)}
              disabled={correctMatches.has(show.id)}
            />
          ))}
        </div>
      </div>

      {/* Genres Section */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-center text-black">
          GENRES
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {shuffledDescriptions.map((desc) => (
            <ShowCard
              key={desc.id}
              id={desc.id}
              title={desc.description}
              type="description"
              isMatched={correctMatches.has(desc.id)}
              isCorrect={correctMatches.has(desc.id)}
              isSelected={selectedDescriptionId === desc.id}
              onSelect={() => handleDescriptionSelect(desc.id)}
              disabled={correctMatches.has(desc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 