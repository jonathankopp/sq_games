import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function formatScore(score: number): string {
  return score.toLocaleString();
}

export function calculateTimeBonus(timeElapsed: number): number {
  const maxBonus = 1000;
  const timeLimit = 300; // 5 minutes in seconds
  return Math.max(0, Math.floor(maxBonus * (1 - timeElapsed / timeLimit)));
} 