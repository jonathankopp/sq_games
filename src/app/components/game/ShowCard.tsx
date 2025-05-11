'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
        'aspect-[3/1] rounded-full border-2 border-black',
        'bg-white flex items-center justify-center p-4',
        'cursor-pointer transition-all duration-200',
        isMatched && isCorrect && 'bg-green-100 border-green-500',
        isSelected && !isMatched && 'bg-blue-100 border-blue-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <p className={cn(
        'font-bold text-sm md:text-xl text-center text-black',
        isMatched && isCorrect && 'text-green-700',
        isSelected && !isMatched && 'text-blue-700',
      )}>
        {!isMatched ? title : 'MATCHED'}
      </p>
    </motion.div>
  );
} 