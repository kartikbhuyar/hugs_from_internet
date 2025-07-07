import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const colors = ['text-pink-400', 'text-rose-400', 'text-red-400', 'text-purple-400'];
    const newHearts: FloatingHeart[] = [];

    for (let i = 0; i < 15; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.color} opacity-30 animate-float-slow`}
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`
          }}
        >
          <Heart className="fill-current" />
        </div>
      ))}
    </div>
  );
};