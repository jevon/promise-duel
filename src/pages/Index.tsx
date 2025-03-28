import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PoliticianColumn from '@/components/PoliticianColumn';
import PromiseSearch from '@/components/PromiseSearch';
import { PromiseData } from '@/components/PromiseCard';
import carneyPromisesData from '@/data/carneyPromises.json';
import poilievrePromisesData from '@/data/poilievrePromises.json';
import { useSwipe } from '@/hooks/useSwipe';
import SwipeIndicator from '@/components/SwipeIndicator';
import TopicComparison from '@/components/TopicComparison';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activePolitician, setActivePolitician] = useState<'carney' | 'poilievre'>('carney');
  
  const carneyPromises: PromiseData[] = carneyPromisesData.map((promise, index) => ({
    ...promise,
    id: promise.transcript_id ? `carney-${promise.transcript_id}-${index}` : `carney-${index}`,
    confidence_level: promise.confidence_level as 'High' | 'Medium' | 'Low'
  }));
  
  const poilievrePromises: PromiseData[] = poilievrePromisesData.map((promise, index) => ({
    ...promise,
    id: promise.transcript_id ? `poilievre-${promise.transcript_id}-${index}` : `poilievre-${index}`,
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

  // Handle politician switching with swipes in a memoized callback
  const handleSwipeLeft = () => {
    // Swipe left means switch to Poilievre
    setActivePolitician('poilievre');
  };
  
  const handleSwipeRight = () => {
    // Swipe right means switch to Carney
    setActivePolitician('carney');
  };
  
  // Initialize swipe detection
  const { isSwiping, swipeDirection } = useSwipe({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    minSwipeDistance: 50,
  });

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
      <Header activePolitician={activePolitician} onPoliticianChange={setActivePolitician} />
      <SwipeIndicator 
        activePolitician={activePolitician}
        isSwiping={isSwiping}
        swipeDirection={swipeDirection}
      />
      <div 
        className="min-h-[50vh] md:min-h-[60vh] flex items-center justify-center relative overflow-hidden hero-section"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black"></div>
        
        <div className="container mx-auto px-4 text-center z-10 py-12">
          <div className="max-w-2xl mx-auto animate-fade-in relative">
            <img 
              src="/promise-duel/uploads/promise-duel-header.png"
              alt="Promise Duel Header"
              className="w-full h-auto mb-8 transition-opacity duration-300 hover:opacity-0"
              style={{ animationDelay: '0.4s' }}
            />
            <img 
              src="/promise-duel/uploads/promise-duel-header-smile.png"
              alt="Promise Duel Header Smile"
              className="w-full h-auto mb-8 absolute top-0 left-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{ animationDelay: '0.4s' }}
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
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
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
          <a 
            href="#/how-it-works" 
            className="inline-block mt-4 text-white/50 hover:text-white/70 text-sm font-montserrat transition-colors duration-200 animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            How does this work? →
          </a>
        </div>
        
        <TopicComparison 
          carneyPromises={carneyPromises}
          poilievrePromises={poilievrePromises}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <PromiseSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={allCategories}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`w-full lg:w-1/2 transition-all duration-300 ${activePolitician === 'carney' ? 'block' : 'hidden lg:block'}`}>
            <PoliticianColumn 
              promises={filteredCarneyPromises} 
              politician="carney"
              backgroundImage={`${import.meta.env.BASE_URL}uploads/bg-red-texture.png`}
              category={selectedCategory}
            />
          </div>
          
          <div className={`w-full lg:w-1/2 transition-all duration-300 ${activePolitician === 'poilievre' ? 'block' : 'hidden lg:block'}`}>
            <PoliticianColumn 
              promises={filteredPoilievrePromises} 
              politician="poilievre"
              backgroundImage={`${import.meta.env.BASE_URL}uploads/bg-blue-texture.png`}
              category={selectedCategory}
            />
          </div>
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
