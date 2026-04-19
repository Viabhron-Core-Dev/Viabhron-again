import React from 'react';
import { Box } from 'lucide-react';

import { UIMode } from '@/core/kernel/types';

interface MossSystemProps {
  uiMode?: UIMode;
}

export const MossSystem: React.FC<MossSystemProps> = ({ uiMode }) => (
  <div className={`h-full bg-gray-950 flex flex-col items-center justify-center p-12 text-center ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'}`}>
    <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-emerald-500/20">
      <Box className="w-10 h-10 text-emerald-400" />
    </div>
    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">MOSS System</h2>
    <p className="text-gray-500 max-w-md leading-relaxed mb-8">
      Management layer for "MOSS" colonies. Handling active growth, dormancy, and re-hydration.
    </p>
  </div>
);
