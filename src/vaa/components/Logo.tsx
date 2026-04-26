import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <img 
      src="/icon.png" 
      alt="Viabhron Logo" 
      className={`${className} rounded-xl object-cover shadow-lg shadow-blue-500/20 border border-white/10`}
      onError={(e) => {
        // Fallback if icon.png is missing
        e.currentTarget.src = 'https://picsum.photos/seed/viabhron/1024/1024';
      }}
    />
  );
};
