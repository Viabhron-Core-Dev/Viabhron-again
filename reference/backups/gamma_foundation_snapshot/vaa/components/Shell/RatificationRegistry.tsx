import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, User, ArrowRight } from 'lucide-react';
import { RatificationProposal, UIMode } from '@/core/kernel/types';

interface RatificationRegistryProps {
  proposals: RatificationProposal[];
  onRatify: (id: string) => void;
  onShelve: (id: string) => void;
  onVeto: (id: string) => void;
  uiMode: UIMode;
}

export const RatificationRegistry: React.FC<RatificationRegistryProps> = ({ 
  proposals, 
  onRatify, 
  onShelve, 
  onVeto, 
  uiMode 
}) => {
  return (
    <div className={`h-full bg-[#050508] p-8 flex flex-col space-y-8 ${uiMode === 'browser' ? 'pb-32 md:pb-8' : 'pb-8'}`}>
      <div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Ratification Registry</h2>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Immutable Action Ledger</p>
      </div>

      <div className="space-y-4">
        {proposals.map(proposal => (
          <div key={proposal.id} className="p-6 bg-white/5 border border-white/5 rounded-[2rem] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{proposal.title}</span>
              </div>
              <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                {proposal.createdAt instanceof Date ? proposal.createdAt.toLocaleDateString() : 'Recent'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mb-1">Status</span>
                  <span className="text-xs font-bold text-white">{proposal.status}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-800" />
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mb-1">Initiator</span>
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-bold text-white">System</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">{proposal.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
