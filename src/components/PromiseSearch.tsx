
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Toggle } from './ui/toggle';

interface PromiseSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

const PromiseSearch: React.FC<PromiseSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
        <Input
          type="text"
          placeholder="Search promises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Toggle
            key={category}
            pressed={selectedCategory === category}
            onPressedChange={() => 
              selectedCategory === category 
                ? setSelectedCategory(null) 
                : setSelectedCategory(category)
            }
            variant="outline"
            size="sm"
            className={`text-sm ${
              selectedCategory === category 
                ? 'bg-white/20 text-white' 
                : 'bg-black/40 text-white/70 hover:bg-white/20 hover:text-white transition-colors duration-200'
            }`}
          >
            {category}
          </Toggle>
        ))}
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-xs text-white/60 underline ml-2 hover:text-white transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>
    </div>
  );
};

export default PromiseSearch;
