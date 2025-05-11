'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetHour: number;
  targetMinute: number;
  targetTimezone: string;
}

export function CountdownTimer({ targetHour, targetMinute, targetTimezone }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current date in user's timezone
      const now = new Date();
      
      // Create target date in the specified timezone
      const targetDate = new Date();
      
      // Set the target time
      targetDate.setHours(targetHour, targetMinute, 0, 0);
      
      // If the target time has already passed today, set it for tomorrow
      if (now > targetDate) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
      
      // Calculate the difference in milliseconds
      const difference = targetDate.getTime() - now.getTime();
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Format the time string
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetHour, targetMinute, targetTimezone]);

  return (
    <div className="font-mono font-bold text-sm md:text-2xl">
      {timeLeft}
    </div>
  );
} 