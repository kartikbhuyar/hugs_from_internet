import React, { useState, useEffect } from 'react';
import { Heart, Save } from 'lucide-react';
import { LetterCard } from './components/LetterCard';
import { LetterModal } from './components/LetterModal';
import { FloatingHearts } from './components/FloatingHearts';
import { letterCategories } from './data/letterCategories';
import { getRandomLetter } from './data/letterContent';
import { LetterCategory } from './types/Letter';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<LetterCategory | null>(null);
  const [selectedContent, setSelectedContent] = useState<string>('');
  const [openedCategories, setOpenedCategories] = useState<Set<string>>(new Set());
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);

  // Load counts from localStorage on component mount
  useEffect(() => {
    console.log('Loading saved letter counts...');
    const savedCounts = localStorage.getItem('letterCounts');
    const savedOpenedCategories = localStorage.getItem('openedCategories');
    
    if (savedCounts) {
      const counts = JSON.parse(savedCounts);
      setCategoryCounts(counts);
      console.log('Loaded counts:', counts);
    }
    
    if (savedOpenedCategories) {
      const opened = JSON.parse(savedOpenedCategories);
      setOpenedCategories(new Set(opened));
      console.log('Loaded opened categories:', opened);
    }
  }, []);

  // Save data to localStorage whenever counts change
  useEffect(() => {
    if (Object.keys(categoryCounts).length > 0) {
      setSaveStatus('saving');
      
      // Save counts
      localStorage.setItem('letterCounts', JSON.stringify(categoryCounts));
      
      // Save opened categories
      localStorage.setItem('openedCategories', JSON.stringify(Array.from(openedCategories)));
      
      console.log('Saved to localStorage:', categoryCounts);
      
      // Show save confirmation
      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 2000);
      }, 300);
    }
  }, [categoryCounts, openedCategories]);
  const openLetter = async (category: LetterCategory) => {
    setIsLoading(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const content = getRandomLetter(category.id);
    setSelectedContent(content);
    setSelectedCategory(category);
    setOpenedCategories(prev => new Set(prev).add(category.id));
    
    // Increment counter for this category
    setCategoryCounts(prev => ({
      ...prev,
      [category.id]: (prev[category.id] || 0) + 1
    }));
    
    setIsLoading(false);
  };

  const closeLetter = () => {
    setSelectedCategory(null);
    setSelectedContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating hearts background */}
      <FloatingHearts />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto text-center py-12 px-4">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
              Open When...
            </h1>
            <div className="flex justify-center space-x-2 mb-6">
              <Heart className="w-6 h-6 text-pink-400 fill-current animate-pulse" />
              <Heart className="w-4 h-4 text-rose-400 fill-current animate-pulse delay-300" />
              <Heart className="w-5 h-5 text-purple-400 fill-current animate-pulse delay-700" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            A collection of <span className="text-pink-400 font-semibold">150+ heartfelt letters</span> written with love, 
            for those moments when you need them most. Each envelope holds a piece of my heart, 
            waiting for the perfect moment to comfort yours.
          </p>
          
          <div className="mt-8 text-lg text-gray-300 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="font-medium text-purple-300">✨ Each click opens a random letter from that category</p>
            <p className="text-sm mt-2 text-gray-400">Over 20 unique letters per category, ensuring a fresh experience every time</p>
          </div>
        </div>

        {/* Letters Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {letterCategories.map((category) => (
              <LetterCard
                key={category.id}
                category={category}
                isOpened={openedCategories.has(category.id)}
                count={categoryCounts[category.id] || 0}
                onClick={() => openLetter(category)}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 relative">
            {/* Save status indicator */}
            {saveStatus && (
              <div className={`absolute top-4 right-4 flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                saveStatus === 'saving' 
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                  : 'bg-green-500/20 text-green-300 border border-green-500/30'
              }`}>
                <Save className={`w-4 h-4 ${saveStatus === 'saving' ? 'animate-pulse' : ''}`} />
                <span>{saveStatus === 'saving' ? 'Saving...' : 'Saved!'}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">150+</div>
                <div className="text-gray-300 font-medium">Unique Letters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">8</div>
                <div className="text-gray-300 font-medium">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)}
                </div>
                <div className="text-gray-300 font-medium">Letters Opened</div>
                <div className="text-xs text-gray-400 mt-1">Automatically saved</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
                <div className="text-gray-300 font-medium">Love & Care</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto text-center py-8 px-4">
          <div className="mb-4 text-sm text-gray-400 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Save className="w-4 h-4 text-green-400" />
              <span className="font-medium text-green-400">Your reading progress is automatically saved</span>
            </div>
            <p className="text-xs">All counters and opened letters are stored permanently in your browser</p>
          </div>
          
          <p className="text-gray-400 text-lg mb-4">
            Created with love only for Teju
          </p>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-gray-500">Crafted with</span>
            <Heart className="w-5 h-5 text-red-400 fill-current animate-pulse" />
            <span className="text-gray-500">for someone extraordinary</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <LetterModal
        category={selectedCategory}
        content={selectedContent}
        onClose={closeLetter}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
              <span className="text-gray-300 font-medium">Opening your letter...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
