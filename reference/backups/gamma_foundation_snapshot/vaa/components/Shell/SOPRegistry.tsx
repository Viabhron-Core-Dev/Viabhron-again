import React from 'react';
import { FileText, Shield, CheckCircle, Clock, Search } from 'lucide-react';

import { SOP, UIMode } from '@/core/kernel/types';

interface SOPRegistryProps {
  sops: SOP[];
  onExecute: (sop: any) => void;
  uiMode: UIMode;
}

export const SOPRegistry: React.FC<SOPRegistryProps> = ({ sops, onExecute, uiMode }) => {
  return (
    <div className={`h-full bg-[#050508] p-8 flex flex-col space-y-8 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">SOP Registry</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Standard Operating Procedures</p>
        </div>
        <div className="p-3 bg-emerald-600/10 rounded-2xl border border-emerald-500/20">
          <Shield className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
        <input 
          type="text" 
          placeholder="Search procedures..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-emerald-500/50 transition-all"
        />
      </div>

      <div className="space-y-3">
        {sops.map(sop => (
          <div key={sop.id} className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl text-gray-500 group-hover:text-emerald-400 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{sop.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">v{sop.version}</span>
                  <div className="w-1 h-1 bg-gray-800 rounded-full" />
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${sop.status === 'active' ? 'text-emerald-500' : 'text-orange-500'}`}>
                    {sop.status}
                  </span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[9px] font-bold text-gray-400 hover:text-white uppercase tracking-widest rounded-xl transition-all border border-white/5">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
