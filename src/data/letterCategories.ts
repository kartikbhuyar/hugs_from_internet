import { Heart, Mail, Star, Sun, Moon, Smile, Coffee, Sparkles } from 'lucide-react';
import type { LetterCategory } from '../types/Letter';

export const letterCategories: LetterCategory[] = [
  {
    id: 'sad',
    title: "Open when you're sad",
    icon: Heart,
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    hoverGradient: 'from-pink-500 via-rose-500 to-red-500',
    shadowColor: 'shadow-pink-200',
    letters: []
  },
  {
    id: 'miss',
    title: 'Open when you miss me',
    icon: Mail,
    gradient: 'from-purple-400 via-violet-400 to-indigo-400',
    hoverGradient: 'from-purple-500 via-violet-500 to-indigo-500',
    shadowColor: 'shadow-purple-200',
    letters: []
  },
  {
    id: 'birthday',
    title: 'Open on your birthday',
    icon: Star,
    gradient: 'from-yellow-400 via-orange-400 to-red-400',
    hoverGradient: 'from-yellow-500 via-orange-500 to-red-500',
    shadowColor: 'shadow-yellow-200',
    letters: []
  },
  {
    id: 'motivation',
    title: 'Open when you need motivation',
    icon: Sun,
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    hoverGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    shadowColor: 'shadow-emerald-200',
    letters: []
  },
  {
    id: 'sleep',
    title: "Open when you can't sleep",
    icon: Moon,
    gradient: 'from-indigo-400 via-purple-400 to-pink-400',
    hoverGradient: 'from-indigo-500 via-purple-500 to-pink-500',
    shadowColor: 'shadow-indigo-200',
    letters: []
  },
  {
    id: 'laugh',
    title: 'Open when you need a laugh',
    icon: Smile,
    gradient: 'from-lime-400 via-green-400 to-emerald-400',
    hoverGradient: 'from-lime-500 via-green-500 to-emerald-500',
    shadowColor: 'shadow-lime-200',
    letters: []
  },
  {
    id: 'stress',
    title: "Open when you're stressed",
    icon: Coffee,
    gradient: 'from-amber-400 via-orange-400 to-red-400',
    hoverGradient: 'from-amber-500 via-orange-500 to-red-500',
    shadowColor: 'shadow-amber-200',
    letters: []
  },
  {
    id: 'loved',
    title: 'Open when you need to remember how loved you are',
    icon: Sparkles,
    gradient: 'from-fuchsia-400 via-pink-400 to-rose-400',
    hoverGradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    shadowColor: 'shadow-fuchsia-200',
    letters: []
  }
];
