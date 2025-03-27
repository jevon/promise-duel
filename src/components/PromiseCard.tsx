
import React from 'react';
import VideoLink from './VideoLink';
import TranscriptLink from './TranscriptLink';

export interface PromiseData {
  id: string;
  description: string;
  quote?: string;
  category?: string;
  confidence_level?: 'High' | 'Medium' | 'Low';
  transcript_id?: string;
  transcript_title?: string;
  transcript_date?: string;
  transcript_url: string;
  videoUrl?: string;
}

interface PromiseCardProps {
  promise: PromiseData;
  politician: 'carney' | 'poilievre';
}

const PromiseCard: React.FC<PromiseCardProps> = ({ promise, politician }) => {
  const cardClass = politician === 'carney' 
    ? 'carney-card' 
    : 'poilievre-card';
  
  const borderHighlight = politician === 'carney'
    ? 'before:bg-carney'
    : 'before:bg-poilievre';
  
  return (
    <div 
      className={`${cardClass} promise-card rounded-lg p-5 mb-4 relative overflow-hidden
                 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${borderHighlight}`}
    >
      {promise.category && (
        <div className={`text-xs font-semibold mb-2 inline-block px-2 py-0.5 rounded-full
                        ${politician === 'carney' ? 'bg-carney/20 text-carney-light' : 'bg-poilievre/20 text-poilievre-light'}`}>
          {promise.category}
        </div>
      )}
      
      <h3 className="text-white text-xl font-oswald tracking-wide leading-tight mb-3">
        {promise.description}
      </h3>
      
      {promise.quote && (
        <div className="text-white/80 text-sm italic mb-4 border-l-2 pl-3 py-1 border-white/20">
          "{promise.quote}"
        </div>
      )}
      
      {promise.transcript_date && (
        <div className="text-white/60 text-xs mb-3">Promised on {promise.transcript_date}</div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 text-sm mt-4">
        {promise.transcript_url && (
          <TranscriptLink url={promise.transcript_url} politician={politician} />
        )}
        {promise.videoUrl && promise.transcript_id && (
          <VideoLink 
            url={promise.videoUrl || `https://www.youtube.com/watch?v=${promise.transcript_id}`} 
            timestamp={null} 
            politician={politician} 
          />
        )}
      </div>
    </div>
  );
};

export default PromiseCard;
