'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ShowCardProps {
  id: string;
  title: string;
  isMatched?: boolean;
  isCorrect?: boolean;
  isSelected?: boolean;
  type: 'show' | 'description';
  onSelect?: () => void;
  className?: string;
  showShakeAnimation?: boolean;
}

export function ShowCard({
  id,
  title,
  isMatched,
  isCorrect,
  isSelected,
  type,
  onSelect,
  className,
  showShakeAnimation
}: ShowCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${type}-${id}`,
    data: {
      type,
      id,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      animate={showShakeAnimation ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      } : {}}
      onClick={onSelect}
      className={cn(
        'aspect-[2/1] flex items-center justify-center p-4',
        'rounded-lg shadow-md transition-all duration-200',
        'border-2 cursor-pointer',
        isDragging && 'opacity-50 scale-105',
        isMatched && isCorrect && 'border-green-500 bg-green-100 dark:bg-green-900/20',
        isSelected && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
        !isMatched && !isSelected && 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
        'hover:shadow-lg hover:scale-102',
        className
      )}
    >
      <p className={cn(
        'text-sm md:text-base font-medium text-center px-2',
        type === 'description' && 'text-xs md:text-sm',
        isMatched && isCorrect && 'text-green-700 dark:text-green-300',
        isSelected && 'text-blue-700 dark:text-blue-300',
        !isMatched && !isSelected && 'text-gray-900 dark:text-gray-100'
      )}>
        {title}
      </p>
    </motion.div>
  );
} 