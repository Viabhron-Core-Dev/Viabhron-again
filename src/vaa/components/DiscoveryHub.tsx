import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Search, 
  ExternalLink, 
  Plus, 
  Check, 
  Globe, 
  Cpu, 
  Zap,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IntelligenceChannel } from '../../types';

interface DiscoveryHubProps {
  onClose: () => void;
  hasGithub: boolean;
  hasHF: boolean;
  onFollow: (channel: IntelligenceChannel) => void;
  followingIds: string[];
}

export const DiscoveryHub: React.FC<DiscoveryHubProps> = ({ 
  onClose, 
  hasGithub, 
  hasHF, 
  onFollow,
  followingIds 
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'huggingface'>(hasGithub ? 'github' : 'huggingface');
  const [searchQuery, setSearchQuery] = useState("");

  const githubTrends = [
    { id: 'gh-openai', name: 'openai/whisper', description: 'Robust Speech Recognition via Large-Scale Weak Supervision', stars: '62k', type: 'github' as const },
    { id: 'gh-meta', name: 'facebookresearch/llama', description: 'Inference code for LLaMA models', stars: '54k', type: 'github' as const },
    { id: 'gh-google', name: 'google/gemma_cpp', description: 'Lightweight, standalone C++ inference engine for Gemma', stars: '12k', type: 'github' as const }
  ];

  const hfTrends = [
    { id: 'hf-mistral', name: 'mistralai/Mistral-7B-v0.1', description: 'Mistral 7B model weights', type: 'huggingface' as const, downloads: '2.4M' },
    { id: 'hf-deepseek', name: 'deepseek-ai/DeepSeek-V3', description: 'DeepSeek-V3 model checkpoints', type: 'huggingface' as const, downloads: '800k' }
  ];

  const currentTrends = activeTab === 'github' ? githubTrends : hfTrends;

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[700] bg-slate-50 flex flex-col pt-safe"
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-100 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 -ml-2 text-slate-400">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Discovery Hub</h2>
        </div>
      </div>

      {/* Connection Guards / Tabs */}
      <div className="p-6 pb-2">
        {(!hasGithub && !hasHF) ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6 text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">Intelligence Substrates Disconnected</h3>
              <p className="text-sm text-slate-500 font-medium px-4">
                Connect your GitHub or Hugging Face accounts in Vaa Settings to ingest global intelligence pulses.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100"
            >
              Go to Settings
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
              {hasGithub && (
                <button 
                  onClick={() => setActiveTab('github')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'github' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                >
                  GitHub
                </button>
              )}
              {hasHF && (
                <button 
                  onClick={() => setActiveTab('huggingface')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'huggingface' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                >
                  Hugging Face
                </button>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab === 'github' ? 'Repositories' : 'Models'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 bg-white border border-slate-100 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-100/50 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      {/* Trending List */}
      {(hasGithub || hasHF) && (
        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trending Pulse</h4>
            <div className="flex items-center gap-1 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              Live <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            {currentTrends.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-start justify-between group hover:border-indigo-100 transition-all"
              >
                <div className="space-y-2 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    {item.type === 'github' ? <Github className="w-4 h-4 text-slate-800" /> : <div className="w-4 h-4 bg-yellow-400 rounded-full" />}
                    <span className="text-sm font-black text-slate-900">{item.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {item.stars || (item as any).downloads}
                    </div>
                    <div className="px-2 py-0.5 bg-slate-50 rounded text-[9px] text-slate-400">
                      {activeTab}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => onFollow({ id: item.id, name: item.name, type: item.type, isFollowing: true, lastPulse: 'Just now' })}
                    className={`p-3 rounded-2xl transition-all ${followingIds.includes(item.id) ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                  >
                    {followingIds.includes(item.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                  <a 
                    href={`https://${activeTab === 'github' ? 'github.com' : 'huggingface.co'}/${item.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center space-y-4">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-12 leading-loose">
              Refining discovery hub... ingestion of creator profiles arriving in next pulse.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
