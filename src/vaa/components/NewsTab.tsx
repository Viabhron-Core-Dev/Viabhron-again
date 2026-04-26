import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  Menu,
  ChevronRight,
  Filter,
  Users,
  MoreVertical,
  Share2,
  Globe,
  Terminal,
  Cpu,
  ExternalLink,
  Plus,
  Hash,
  Brain,
  X,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Agent, NewsCard, IntelligenceChannel, IntelligencePulse } from '../../types';

interface NewsTabProps {
  onShowMenu: () => void;
  showMenu: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  onOpenFilter: () => void;
  showSwipeView: boolean;
  setShowSwipeView: (show: boolean) => void;
  agents: Agent[];
  newsCards: NewsCard[];
  onCardTap: (index: number) => void;
  onOpenDiscovery: () => void;
  channels: IntelligenceChannel[];
  pulses: IntelligencePulse[];
  newsIntakeMode: "vaa" | "viabhron";
  isKernelActive: boolean;
}

export const NewsTab: React.FC<NewsTabProps> = ({ 
  onShowMenu, 
  showMenu, 
  menuRef, 
  onOpenFilter,
  showSwipeView,
  setShowSwipeView,
  agents,
  newsCards,
  onCardTap,
  onOpenDiscovery,
  channels,
  pulses,
  newsIntakeMode,
  isKernelActive
}) => {
  const [showTrendFilter, setShowTrendFilter] = useState(false);
  const [filterKeywords, setFilterKeywords] = useState<string[]>(['javascript', 'web-design']);
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !filterKeywords.includes(newKeyword.trim().toLowerCase())) {
      setFilterKeywords([...filterKeywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
      <AnimatePresence>
        {showTrendFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Trend Filter</h3>
                <button onClick={() => setShowTrendFilter(false)} className="p-2 text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-normal">
                Viabhron will scrub these keywords from your GitHub & Hugging Face feeds.
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                    placeholder="Enter keyword..."
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-200 transition-all"
                  />
                  <button onClick={handleAddKeyword} className="p-2 bg-indigo-600 text-white rounded-xl">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto no-scrollbar">
                  {filterKeywords.map(kw => (
                    <div key={kw} className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-[10px] font-black uppercase tracking-widest">
                      {kw}
                      <button 
                        onClick={() => setFilterKeywords(filterKeywords.filter(k => k !== kw))}
                        className="p-0.5 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setShowTrendFilter(false)}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100"
              >
                Ratify Filter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Search Header - Temp Chat Portal */}
      <div className="p-6 pb-2">
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search className="w-4 h-4 text-indigo-500" />
            <div className="w-[1px] h-4 bg-slate-200" />
          </div>
          <input 
            type="text" 
            placeholder="Ask Resident AI about intelligence..."
            className="w-full h-14 bg-white border-2 border-indigo-50/50 rounded-[2rem] pl-20 pr-14 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm group-hover:shadow-md"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button 
              onClick={onOpenFilter}
              className="p-2.5 bg-slate-100 rounded-2xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
              title="Filter"
            >
              <Filter className="w-4 h-4" />
            </button>
            <div className="pr-1">
              <Zap className="w-4 h-4 text-amber-500 animate-pulse fill-amber-500/20" />
            </div>
          </div>
        </div>
        <div className="mt-2 px-4 flex items-center gap-2">
          <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none">Temp Shell</span>
          <div className="w-1 h-1 bg-indigo-200 rounded-full" />
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-none">No persistent history in news substrate</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Urgent Intelligence (Official Updates - Restored) */}
        <section className="py-4">
          <div className="px-6 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">
                {newsIntakeMode === 'vaa' ? 'Vaa Broadcast' : 'Viabhron Intake'}
              </h2>
            </div>
            {newsIntakeMode === 'viabhron' && (
              <div className={`px-2 py-0.5 rounded flex items-center gap-1 ${isKernelActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                <Brain className="w-2.5 h-2.5" />
                <span className="text-[7px] font-black uppercase tracking-widest">{isKernelActive ? 'Kernel Active' : 'Kernel Offline'}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto px-6 no-scrollbar snap-x snap-mandatory">
            {newsCards.map((card, idx) => (
              <div 
                key={card.id}
                onClick={() => onCardTap(idx)}
                className="flex-shrink-0 w-[160px] h-[200px] bg-white rounded-3xl p-4 flex flex-col justify-between border border-slate-100 shadow-sm active:scale-95 transition-all snap-start relative group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${newsIntakeMode === 'vaa' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{card.category}</span>
                    </div>
                    {newsIntakeMode === 'vaa' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isKernelActive) {
                            import('sonner').then(({ toast }) => toast.success("Intelligence ratified to Sovereign Substrate."));
                          } else {
                            import('sonner').then(({ toast }) => toast.error("Kernel Disconnected: Cannot relay intelligence."));
                          }
                        }}
                        className={`p-1 transition-all rounded-lg ${isKernelActive ? 'text-amber-500 hover:bg-amber-50 active:scale-90' : 'text-slate-200 cursor-not-allowed grayscale'}`}
                        title={isKernelActive ? "Relay to Viabhron" : "Kernel Disconnected"}
                      >
                        <Zap className={`w-3.5 h-3.5 ${isKernelActive ? 'fill-amber-500' : ''}`} />
                      </button>
                    )}
                  </div>
                  <h3 className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tight line-clamp-3 group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-[9px] text-slate-400 font-bold leading-tight line-clamp-2">
                    {card.summary}
                  </p>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-50">
                    <span className="text-[7px] font-black text-slate-900 uppercase tracking-tighter">
                      {newsIntakeMode === 'vaa' ? card.source : 'Synthesized Logic'}
                    </span>
                    <div className={`w-2.5 h-2.5 rounded-full ${newsIntakeMode === 'vaa' ? 'bg-slate-100' : 'bg-indigo-50 flex items-center justify-center'}`}>
                      {newsIntakeMode === 'viabhron' && <Brain className="w-2 h-2 text-indigo-400" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sovereign Channels - bottom starts here */}
        <section className="bg-white border-y border-slate-100/50 py-4">
          <div className="px-6 mb-3 flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Following Channels</h2>
            <button 
              onClick={onOpenDiscovery}
              className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 group"
            >
              Discover <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto px-6 no-scrollbar">
            {/* Add More Circular Button */}
            <button 
              onClick={onOpenDiscovery}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-indigo-400 group-hover:text-indigo-600 transition-all bg-slate-50">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Follow</span>
            </button>

            {channels.filter(c => c.isFollowing).map((channel) => (
              <div key={channel.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border-2 border-slate-100 p-0.5 group-hover:border-indigo-500 transition-all relative">
                  <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-[10px] overflow-hidden group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    {channel.avatar ? (
                      <img src={channel.avatar} className="w-full h-full object-cover" />
                    ) : (
                      channel.name.charAt(0)
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-white border border-slate-100 flex items-center justify-center p-0.5">
                    {channel.type === 'github' ? <Github className="w-2.5 h-2.5 text-slate-900" /> : <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />}
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter group-hover:text-slate-800 text-center truncate w-12">
                  {channel.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Feed (Vertical Thread) */}
        <section className="px-6 py-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Intelligence Thread</h2>
            <button 
              onClick={() => setShowTrendFilter(true)}
              className="p-1.5 bg-white rounded-lg text-slate-400 border border-slate-100 shadow-sm hover:text-indigo-600 transition-all"
              title="Metabolic Filter"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pulses.map(pulse => (
              <motion.div 
                key={pulse.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm space-y-3 relative group"
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center">
                      {channels.find(c => c.id === pulse.channelId)?.type === 'github' ? <Github className="w-3 h-3 text-slate-900" /> : <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />}
                    </div>
                    <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
                      {channels.find(c => c.id === pulse.channelId)?.name || 'System'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{pulse.timestamp}</span>
                    <div className="relative group/menu">
                      <button className="p-1 text-slate-300 hover:text-slate-600 transition-all">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-20">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(pulse.content);
                            toast.success("Intelligence copied to buffer.");
                          }}
                          className="w-full px-4 py-2 text-left text-[9px] font-black text-slate-600 hover:bg-slate-50 uppercase tracking-widest flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                          Copy Text
                        </button>
                        <button 
                          onClick={() => toast.success("Forwarding intelligence...")}
                          className="w-full px-4 py-2 text-left text-[9px] font-black text-slate-600 hover:bg-slate-50 uppercase tracking-widest flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                          Forward
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm font-medium text-slate-700 leading-relaxed select-text cursor-auto">
                  {pulse.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-indigo-50 rounded-lg text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                      {pulse.type}
                    </div>
                  </div>
                  <button 
                    onClick={() => toast.success("Sharing to Sovereign Contacts...")}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group/share"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-400 group-hover/share:text-indigo-600" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover/share:text-slate-600">Share to Contact</span>
                  </button>
                </div>

                {/* Long Press Visual Indicator Overlay (Pseudo) */}
                <div className="absolute inset-0 bg-indigo-600/0 active:bg-indigo-600/5 transition-colors rounded-[2rem] pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Discovery Call to Action */}
          <div className="pt-8 flex flex-col items-center gap-4">
            <div className="w-12 h-1 bg-slate-200 rounded-full mb-2" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center px-12 leading-loose">
              Connect to GitHub & Hugging Face to ingest more frontier intelligence.
            </p>
            <button 
              onClick={onOpenDiscovery}
              className="py-4 px-8 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all"
            >
              Explore Discovery Hub
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
