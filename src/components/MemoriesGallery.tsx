import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Heart, Calendar, Image as ImageIcon } from 'lucide-react';
import { Memory } from '../types/Memory';

interface MemoriesGalleryProps {
  memories: Memory[];
  onAddMemory: (memory: Omit<Memory, 'id'>) => void;
  onDeleteMemory: (id: string) => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  memories,
  onAddMemory,
  onDeleteMemory
}) => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      
      const newMemory: Omit<Memory, 'id'> = {
        imageUrl,
        caption: caption || 'A beautiful memory',
        uploadedAt: new Date(),
        fileName: file.name
      };
      
      onAddMemory(newMemory);
      setCaption('');
      setIsUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.readAsDataURL(file);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <Camera className="w-8 h-8 text-pink-400" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Memories
          </h2>
          <Camera className="w-8 h-8 text-purple-400" />
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A collection of beautiful moments captured in time. Upload your favorite photos and create lasting memories together.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Add a New Memory</h3>
          
          {/* Caption Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Add a caption for your memory..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full max-w-md mx-auto px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>
          
          {/* Upload Button */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Choose Photo from Gallery</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {memories.length === 0 ? (
        <div className="text-center py-16">
          <ImageIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No memories yet</h3>
          <p className="text-gray-500">Upload your first photo to start building your memory collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedMemory(memory)}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={memory.imageUrl}
                  alt={memory.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-medium text-sm mb-1 line-clamp-2">{memory.caption}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-300">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(memory.uploadedAt)}</span>
                </div>
              </div>
              
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMemory(memory.id);
                }}
                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 hover:scale-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing full image */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            {/* Close button */}
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image */}
            <div className="relative">
              <img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.caption}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
            
            {/* Caption and details */}
            <div className="p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-2">{selectedMemory.caption}</h3>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(selectedMemory.uploadedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                  <span className="text-sm">Beautiful Memory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
