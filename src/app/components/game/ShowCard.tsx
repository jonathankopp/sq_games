'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GripHorizontal } from 'lucide-react';

interface ShowCardProps {
  id: string;
  title: string;
  type: 'show' | 'description';
  isMatched?: boolean;
  isCorrect?: boolean;
  isSelected?: boolean;
  showShakeAnimation?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function ShowCard({
  title,
  type,
  isMatched,
  isCorrect,
  isSelected,
  showShakeAnimation,
  disabled,
  onSelect,
  className
}: ShowCardProps) {
  return (
    <motion.div
      animate={showShakeAnimation ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      } : {}}
      onClick={disabled ? undefined : onSelect}
      className={cn(
        'aspect-[2.5/1] md:aspect-[2/1] flex items-center justify-center p-2 md:p-4 relative group',
        'rounded-md md:rounded-lg shadow-md transition-all duration-200',
        'border md:border-2 cursor-pointer',
        isMatched && isCorrect && 'border-green-500 bg-green-100 dark:bg-green-900/20',
        isSelected && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
        !isMatched && !isSelected && type === 'show' && 'border-purple-500/50 bg-purple-500/5 dark:border-purple-500/30 dark:bg-purple-900/10',
        !isMatched && !isSelected && type === 'description' && 'border-gray-200 bg-white/5 dark:border-gray-700 dark:bg-gray-800/50',
        showShakeAnimation && 'border-red-500 bg-red-100/10',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        !disabled && 'hover:shadow-lg hover:scale-102',
        className
      )}
    >
      {/* Drag handle indicator */}
      {!disabled && (
        <GripHorizontal className="absolute top-1 right-1 md:top-2 md:right-2 w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-50 transition-opacity text-gray-400" />
      )}
      
      <p className={cn(
        'text-center px-1 md:px-2 line-clamp-2 md:line-clamp-1',
        type === 'show' && 'text-sm md:text-lg font-semibold text-purple-100',
        type === 'description' && 'text-xs md:text-base font-medium text-gray-300',
        isMatched && isCorrect && 'text-green-700 dark:text-green-300',
        isSelected && 'text-blue-700 dark:text-blue-300',
        showShakeAnimation && 'text-red-500 dark:text-red-400'
      )}>
        {title}
      </p>
    </motion.div>
  );
} 