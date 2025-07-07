import React from 'react';
import type { LetterCategory } from '../types/Letter';

interface LetterCardProps {
  category: LetterCategory;
  isOpened: boolean;
  onClick: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ category, isOpened, onClick }) => {
  const IconComponent = category.icon;

  return (
    <div
      onClick={onClick}
      className={`
        relative group cursor-pointer transform transition-all duration-500 ease-out
        hover:scale-105 hover:-translate-y-3 hover:rotate-1
        ${isOpened ? 'ring-2 ring-purple-400/50 ring-offset-2 ring-offset-transparent' : ''}
      `}
    >
      {/* Glow effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-0 
        group-hover:opacity-40 transition-opacity duration-500 scale-110
      `} />

      {/* Main card */}
      <div className={`
        relative bg-gradient-to-br ${category.gradient} p-8 rounded-2xl 
        ${category.shadowColor} shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        border border-white/20 backdrop-blur-sm
        min-h-[200px] flex flex-col items-center justify-center text-center
        group-hover:bg-gradient-to-br group-hover:${category.hoverGradient}
      `}>
        {/* Sparkle effects */}
        <div className="absolute top-3 right-3 w-2 h-2 bg-white/60 rounded-full animate-pulse" />
        <div className="absolute top-6 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-700" />

        {/* Icon */}
        <div className="text-white mb-4 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
          <div className="animate-float">
            <IconComponent className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-white/90 transition-colors duration-300">
          {category.title}
        </h3>

        {/* Subtitle */}
        <p className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          Click to open a letter
        </p>

        {/* Opened Indicator */}
        {isOpened && (
          <div className="absolute top-3 left-3 flex items-center space-x-1">
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
            <div className="text-white/80 text-xs font-medium">Opened</div>
          </div>
        )}

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer" />
      </div>
    </div>
  );
};
