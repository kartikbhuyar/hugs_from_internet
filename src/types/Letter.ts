export interface LetterCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  hoverGradient: string;
  shadowColor: string;
  letters: string[];
}

export interface Letter {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  content: string[];
  category: string;
}
