import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PoliticianColumn from '@/components/PoliticianColumn';
import PromiseSearch from '@/components/PromiseSearch';
import { PromiseData } from '@/components/PromiseCard';
import carneyPromisesData from '@/data/carneyPromises.json';
import poilievrePromisesData from '@/data/poilievrePromises.json';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const carneyPromises: PromiseData[] = carneyPromisesData.map(promise => ({
    ...promise,
    confidence_level: promise.confidence_level as 'High' | 'Medium' | 'Low'
  }));
  
  const poilievrePromises: PromiseData[] = poilievrePromisesData.map(promise => ({
    ...promise,
    confidence_level: promise.confidence_level as 'High' | 'Medium' | 'Low'
  }));
  
  const allCategories = Array.from(new Set([
    ...carneyPromises.map(promise => promise.category),
    ...poilievrePromises.map(promise => promise.category)
  ].filter(Boolean) as string[]));
  
  const filterPromises = (promises: PromiseData[]): PromiseData[] => {
    return promises.filter(promise => {
      const matchesSearch = 
        !searchTerm ||
        promise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (promise.quote && promise.quote.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (promise.category && promise.category.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
  };
  
  const filteredCarneyPromises = filterPromises(carneyPromises);
  const filteredPoilievrePromises = filterPromises(poilievrePromises);

  useEffect(() => {
    setMounted(true);
    
    const blueTexture = new Image();
    const redTexture = new Image();

    // Use the correct base path for both development and production
    const basePath = import.meta.env.BASE_URL;
    blueTexture.src = `${basePath}uploads/bg-blue-texture.png`;
    redTexture.src = `${basePath}uploads/bg-red-texture.png`;
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div 
        className="h-[50vh] md:h-[60vh] flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black"></div>
        
        <div className="container mx-auto px-4 text-center z-10">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <img 
              src={`${import.meta.env.BASE_URL}uploads/promise-duel-header.png`} 
              alt="Promise Duel - Carney vs Poilievre" 
              className="w-full h-auto shadow-lg"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-12 mt-6">
            <div className="text-carney text-2xl md:text-3xl font-oswald tracking-wider animate-slide-in-left">
              MARK CARNEY
            </div>
            <div className="h-10 w-0.5 bg-white/50 mx-4 rotate-12 hidden md:block"></div>
            <div className="text-poilievre text-2xl md:text-3xl font-oswald tracking-wider animate-slide-in-right">
              PIERRE POILIEVRE
            </div>
          </div>
          
          <div className="text-white/80 max-w-2xl mx-auto mt-8 font-montserrat animate-fade-in px-4" style={{ animationDelay: '0.6s' }}>
            Track and compare the political promises made during the 2025 Canadian election cycle. 
            Click on video links to see the exact moment each promise was made.
          </div>
        </div>
      </div>

      <Header />
      
      <div className="container mx-auto px-4 mt-24">
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4 animate-fade-in">
            2025 ELECTION PROMISES
          </div>
          <h2 className="text-3xl md:text-4xl font-bebas tracking-wide mb-4 animate-fade-in">
            WHO PROMISED WHAT?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto font-montserrat animate-fade-in">
            Compare the campaign promises made by Mark Carney and Pierre Poilievre. 
            Each promise includes a description, quote, and transcript link.
          </p>
        </div>
        
        <PromiseSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={allCategories}
        />
        
        <div className="flex flex-col lg:flex-row -mx-4">
          <PoliticianColumn 
            promises={filteredCarneyPromises} 
            politician="carney"
            backgroundImage={`${import.meta.env.BASE_URL}uploads/bg-red-texture.png`}
            category={selectedCategory}
          />
          
          <PoliticianColumn 
            promises={filteredPoilievrePromises} 
            politician="poilievre"
            backgroundImage={`${import.meta.env.BASE_URL}uploads/bg-blue-texture.png`}
            category={selectedCategory}
          />
        </div>
      </div>
      
      <footer className="mt-24 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-white/50 text-center">
          <p className="text-sm">Promise Duel - Tracking Political Promises in the 2025 Canadian Election</p>
          <p className="mt-2 text-sm">This site is for informational purposes only and does not endorse any politician.</p>
          
          <div className="mt-8 flex flex-col items-center justify-center">
            <p className="text-white/70 text-sm font-medium mb-3">Brought to you by:</p>
            <a 
              href="https://buildcanada.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-90"
            >
              <img 
                src={`${import.meta.env.BASE_URL}uploads/build-canada-logo.png`} 
                alt="Build Canada" 
                className="h-16 md:h-20 shadow-md transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
