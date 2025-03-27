
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
  
  // Use the texture images with complete URLs
  const columnBackground = politician === 'poilievre'
    ? '/lovable-uploads/9aa9fc43-b641-4246-aad6-67b96f85f7be.png'
    : '/lovable-uploads/cd58fd17-b6c9-4b34-82d1-393cf1195580.png';
  
  return (
    <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 relative animate-fade-in" 
         style={{ 
           backgroundImage: `url(${columnBackground})`,
           backgroundRepeat: 'repeat',
           backgroundSize: '400px',
           backgroundAttachment: 'fixed',
           animationDelay: politician === 'poilievre' ? '0.2s' : '0.4s'
         }}>
      <div className="pt-10 md:pt-12">
        <div className="space-y-4 pt-2 relative z-10">
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
