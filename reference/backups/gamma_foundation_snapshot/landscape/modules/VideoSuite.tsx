import React from 'react';
import { Video } from 'lucide-react';

import { UIMode } from '@/core/kernel/types';

interface VideoSuiteProps {
  uiMode?: UIMode;
}

export const VideoSuite: React.FC<VideoSuiteProps> = ({ uiMode }) => (
  <div className={`h-full bg-gray-950 flex flex-col items-center justify-center p-12 text-center ${uiMode === 'browser' ? 'pb-32 md:pb-12' : 'pb-12'}`}>
    <div className="w-24 h-24 bg-purple-500/10 rounded-[2.5rem] flex items-center justify-center mb-8 border border-purple-500/20">
      <Video className="w-10 h-10 text-purple-400" />
    </div>
    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-4">Sovereign Video Suite</h2>
    <p className="text-gray-500 max-w-md leading-relaxed mb-8">
      Short-form animation and cinematic sequences generated in private cloud.
    </p>
  </div>
);
