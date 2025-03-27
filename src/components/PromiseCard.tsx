import React from 'react';
import VideoLink from './VideoLink';
import TranscriptLink from './TranscriptLink';
import VideoOverlay from './VideoOverlay';

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
  timestamp?: string;
  timestamp_url?: string;
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
        <div className="flex items-center gap-2 flex-wrap">
          <a 
            href={promise.timestamp_url || promise.transcript_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-sm ${politician === 'carney' ? 'text-carney hover:text-carney/80' : 'text-poilievre hover:text-poilievre/80'} transition-colors`}
          >
            {promise.transcript_title}
            {promise.timestamp && (
              <span className="text-white/60 ml-1">({promise.timestamp})</span>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromiseCard;
