import React from 'react';
import PromiseCard, { PromiseData } from './PromiseCard';

interface PoliticianColumnProps {
  promises: PromiseData[];
  politician: 'carney' | 'poilievre';
  backgroundImage: string;
  category?: string | null;
}

const PoliticianColumn: React.FC<PoliticianColumnProps> = ({ 
  promises, 
  politician,
  backgroundImage,
  category
}) => {
  // Filter promises by category if one is selected
  const filteredPromises = category 
    ? promises.filter(promise => promise.category === category) 
    : promises;
  
  return (
    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 relative animate-fade-in" 
         style={{ 
           backgroundImage: `url(${backgroundImage})`,
           backgroundRepeat: 'repeat',
           backgroundSize: '400px',
           backgroundAttachment: 'fixed',
           animationDelay: politician === 'poilievre' ? '0.2s' : '0.4s'
         }}>
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="pt-4 md:pt-6 relative z-10">
        <div className="space-y-4 relative z-10">
          {filteredPromises.length > 0 ? (
            filteredPromises.map((promise, index) => (
              <div key={promise.id} style={{ animationDelay: `${0.1 * (index + 1)}s` }} className="animate-scale-in">
                <PromiseCard promise={promise} politician={politician} />
              </div>
            ))
          ) : (
            <div className="text-white/70 text-center py-8">
              No promises found in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliticianColumn;
