import React from 'react';

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
    <div className="flex flex-col gap-4 mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search promises..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedCategory === category
                ? 'bg-white/20 text-white backdrop-blur-sm border border-white/30'
                : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white/90 backdrop-blur-sm border border-white/20'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromiseSearch;
