import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  Menu,
  ChevronRight,
  Filter,
  Users
} from 'lucide-react';
import { Agent, NewsCard } from '../../types';

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
  onCardTap
}) => {
  const [selectedNews, setSelectedNews] = useState<NewsCard | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCloseArticle = () => {
    setSelectedNews(null);
    setShowDetails(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden select-none">
      {/* Search Header */}
      <div className="p-6 pb-2">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search Intelligence..."
            className="w-full h-14 bg-white border border-slate-100 rounded-[2rem] pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm group-hover:shadow-md"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <button 
            onClick={onOpenFilter}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-8">
        {/* Urgent Intelligence Section */}
        <section>
          <div className="px-6 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Urgent Intelligence</h2>
            </div>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 group">
              Global Stream <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar snap-x snap-mandatory">
            {newsCards.map((card, idx) => (
              <div 
                key={card.id}
                onClick={() => onCardTap(idx)}
                className="flex-shrink-0 w-[160px] h-[220px] bg-white rounded-3xl p-5 flex flex-col justify-between border border-slate-100 shadow-sm active:scale-95 transition-all snap-start relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{card.category}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight uppercase tracking-tight line-clamp-3 group-hover:text-indigo-600 transition-colors">
                    {card.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-400 font-bold leading-normal line-clamp-3">
                    {card.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-[8px] font-black text-slate-900 uppercase tracking-tighter">{card.source}</span>
                    <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              </div>
            ))}
          </div>
        </section>

        {/* Standard Intelligence Dispatch Section */}
        <section className="px-6 pb-8">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Dispatch History</h2>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {[
                { name: "Strategic Analyst", desc: "Portfolio rebalacing complete. 3.2% gas efficiency gain.", time: "1h", type: "system" },
                { name: "The Governor", desc: "Voted registered for Proposal #892... success.", time: "4h", type: "gov" },
                { name: "Nexus Buffer", desc: "3 new spores landed on Edge Node Delta.", time: "6h", type: "nexus" },
                { name: "Viabhron System", desc: "Nightly synchronization protocol engaged.", time: "12h", type: "core" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm transition-all flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1 py-1 border-b border-slate-50 transition-colors group-hover:border-indigo-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{item.name}</span>
                      <span className="text-[9px] font-bold text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
