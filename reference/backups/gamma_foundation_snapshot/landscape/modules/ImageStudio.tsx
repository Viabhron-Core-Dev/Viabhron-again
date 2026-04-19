import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

import { UIMode } from '@/core/kernel/types';

interface ImageStudioProps {
  uiMode?: UIMode;
}

export const ImageStudio: React.FC<ImageStudioProps> = ({ uiMode }) => (
  <div className={`h-full bg-gray-950 flex flex-col items-center justify-center p-12 text-center ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'}`}>
    <div className="w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-blue-500/20">
      <ImageIcon className="w-10 h-10 text-blue-400" />
    </div>
    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Sovereign Image Studio</h2>
    <p className="text-gray-500 max-w-md leading-relaxed mb-8">
      Rapid visual synthesis and asset creation within the private substrate.
    </p>
  </div>
);
