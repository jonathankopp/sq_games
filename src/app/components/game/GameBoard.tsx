'use client';

import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ShowCard } from './ShowCard';
import { shuffleArray } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function GameBoard() {
  const {
    shows,
    userMatches,
    setMatch,
    removeMatch,
    score,
    setScore,
    timeElapsed,
    updateTimeElapsed,
    isGameComplete,
    completeGame,
  } = useGameStore();

  const [draggedItem, setDraggedItem] = useState<{
    id: string;
    title: string;
    type: 'show' | 'description';
  } | null>(null);

  const [shuffledDescriptions, setShuffledDescriptions] = useState<typeof shows>([]);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [incorrectPairIds, setIncorrectPairIds] = useState<Set<string>>(new Set());

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isGameComplete) {
        updateTimeElapsed(timeElapsed + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeElapsed, isGameComplete, updateTimeElapsed]);

  // Initialize shuffled descriptions
  useEffect(() => {
    if (shows.length > 0) {
      setShuffledDescriptions(shuffleArray(shows));
    }
  }, [shows]);

  const handleDragStart = (event: DragStartEvent) => {
    const { id, type } = event.active.data.current as { id: string; type: 'show' | 'description' };
    const item = type === 'show' 
      ? shows.find(s => s.id === id)
      : shuffledDescriptions.find(s => s.id === id);
    
    if (item) {
      setDraggedItem({
        id: item.id,
        title: type === 'show' ? item.title : item.description,
        type,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedItem(null);

    if (!over) return;

    const sourceId = (active.data.current as { id: string }).id;
    const targetId = over.id as string;

    handleMatch(sourceId, targetId);
  };

  const handleCardClick = (id: string, type: 'show' | 'description') => {
    if (type === 'show') {
      setSelectedShowId(id === selectedShowId ? null : id);
    } else if (selectedShowId) {
      handleMatch(selectedShowId, id);
      setSelectedShowId(null);
    }
  };

  const handleMatch = (showId: string, descriptionId: string) => {
    const isCorrectMatch = shows.some(show => 
      (show.id === showId && `desc-${show.id}` === descriptionId) ||
      (show.id === descriptionId && `desc-${show.id}` === showId)
    );

    if (isCorrectMatch) {
      const matchScore = Math.max(1000 - timeElapsed * 10, 100); // Time-based scoring
      setScore(score + matchScore);
      setMatch(showId, descriptionId);

      // Check if game is complete
      if (Object.keys(userMatches).length === shows.length - 1) {
        completeGame();
      }
    } else {
      // Show shake animation for incorrect match
      setIncorrectPairIds(new Set([showId, descriptionId]));
      setTimeout(() => {
        setIncorrectPairIds(new Set());
      }, 500);
      removeMatch(showId);
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-8">
        {/* Shows Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shows.map((show) => {
            const isMatched = show.id in userMatches;
            const matchedWithId = userMatches[show.id];
            const isCorrect = matchedWithId === `desc-${show.id}`;

            return (
              <ShowCard
                key={show.id}
                id={show.id}
                title={show.title}
                type="show"
                isMatched={isMatched}
                isCorrect={isCorrect}
                isSelected={selectedShowId === show.id}
                onSelect={() => handleCardClick(show.id, 'show')}
                showShakeAnimation={incorrectPairIds.has(show.id)}
              />
            );
          })}
        </div>

        {/* Descriptions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {shuffledDescriptions.map((show) => {
            const dropZoneId = `desc-${show.id}`;
            const matchedShowId = Object.entries(userMatches).find(
              ([_, descId]) => descId === dropZoneId
            )?.[0];
            const isMatched = Boolean(matchedShowId);
            const isCorrect = matchedShowId === show.id;

            return (
              <ShowCard
                key={dropZoneId}
                id={show.id}
                title={show.description}
                type="description"
                isMatched={isMatched}
                isCorrect={isCorrect}
                onSelect={() => handleCardClick(show.id, 'description')}
                showShakeAnimation={incorrectPairIds.has(show.id)}
              />
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {draggedItem && (
          <ShowCard
            id={draggedItem.id}
            title={draggedItem.title}
            type={draggedItem.type}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
} 