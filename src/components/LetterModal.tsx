import React, { useEffect, useState } from 'react';
import { X, Heart } from 'lucide-react';
import type { LetterCategory } from '../types/Letter';

interface LetterModalProps {
  category: LetterCategory | null;
  content: string;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ category, content, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (category) {
      setIsVisible(true);
      setTimeout(() => setIsContentVisible(true), 300);
    }
  }, [category]);

  const handleClose = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200);
    }, 200);
  };

  if (!category) return null;

  const IconComponent = category.icon;

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center p-4
      transition-all duration-500 ease-out
      ${isVisible ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'}
    `}>
      {/* Modal container */}
      <div className={`
        relative bg-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden
        shadow-2xl transform transition-all duration-500 ease-out border border-gray-700
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Header with gradient */}
        <div className={`
          relative bg-gradient-to-br ${category.gradient} p-8 text-center
          transform transition-all duration-700 ease-out
          ${isContentVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
        `}>
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-8 left-8 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-4 right-8 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-700" />
          
          {/* Icon */}
          <div className="text-white mb-4 animate-float">
            <IconComponent className="w-10 h-10 mx-auto" />
          </div>
          
          {/* Title */}
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            {category.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/90 text-lg">
            A letter written with love, just for you
          </p>
        </div>
        
        {/* Content */}
        <div className={`
          p-8 md:p-12 overflow-y-auto max-h-[60vh] bg-gray-800
          transform transition-all duration-700 ease-out delay-200
          ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {content}
            </div>
          </div>
          
          {/* Decorative heart at the end */}
          <div className="flex justify-center mt-8 pt-6 border-t border-gray-700">
            <Heart className="w-6 h-6 text-rose-400 fill-current animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};