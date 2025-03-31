import React from 'react';
import PromiseCard, { PromiseData } from './PromiseCard';

interface PoliticianColumnProps {
  promises: PromiseData[];
  politician: 'carney' | 'poilievre';
  backgroundImage: string;
  category?: string | null;
  date: string;
  onPromiseClick?: (promise: PromiseData) => void;
}

const PoliticianColumn: React.FC<PoliticianColumnProps> = ({ 
  promises, 
  politician,
  backgroundImage,
  category,
  date,
  onPromiseClick
}) => {
  // Filter promises by category if one is selected
  const filteredPromises = category 
    ? promises.filter(promise => promise.category === category) 
    : promises;
  
  return (
    <div className="w-full h-full relative animate-fade-in" 
         style={{ 
           backgroundImage: `url(${backgroundImage})`,
           backgroundRepeat: 'repeat',
           backgroundSize: '400px',
           backgroundAttachment: 'fixed',
           animationDelay: politician === 'poilievre' ? '0.2s' : '0.4s'
         }}>
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="pt-4 md:pt-6 relative z-10 h-full flex flex-col">
        {/* Date delimiter */}
        <div className="flex items-center gap-3 mb-4 px-4">
          <div className="h-[1px] flex-grow bg-white/10"></div>
          <div className="text-white/50 text-sm font-medium whitespace-nowrap">
            {date === 'Unknown Date' ? date : new Date(date + 'T00:00:00').toLocaleDateString('en-CA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

        <div className="space-y-4 relative z-10">
          {filteredPromises.map((promise, index) => (
            <div 
              key={promise.id} 
              style={{ animationDelay: `${0.1 * (index + 1)}s` }} 
              className="animate-scale-in px-4"
            >
              <PromiseCard 
                promise={promise} 
                politician={politician}
                onClick={() => onPromiseClick?.(promise)}
              />
            </div>
          ))}

          {filteredPromises.length === 0 && (
            <div className="px-4">
              <div className="text-white/70 text-center py-4 border border-white/10 rounded-lg backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="mb-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm">
                  {category 
                    ? `No promises found in the ${category} category`
                    : "No promises or commitments detected on this day"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliticianColumn;
