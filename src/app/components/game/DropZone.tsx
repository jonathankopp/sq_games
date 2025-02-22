'use client';

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface DropZoneProps {
  id: string;
  children?: ReactNode;
  className?: string;
}

export function DropZone({ id, children, className }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'p-4 rounded-lg border-2 border-dashed transition-colors min-h-[100px]',
        isOver && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
        !isOver && 'border-gray-300 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
} 