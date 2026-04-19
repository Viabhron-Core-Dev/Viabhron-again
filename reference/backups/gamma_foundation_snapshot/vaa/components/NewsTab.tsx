import React, { useState } from "react";
import { 
  RefreshCw, 
  MoreVertical, 
  Sparkles, 
  Plus, 
  Terminal, 
  Smile, 
  Shield, 
  Share2, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NewsCard } from "@/core/kernel/types";

interface NewsTabProps {
  onShowMenu: () => void;
  showMenu: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  onOpenFilter: () => void;
  showSwipeView: boolean;
  setShowSwipeView: (show: boolean) => void;
}

export const NewsTab: React.FC<NewsTabProps> = ({ 
  onShowMenu, 
  showMenu, 
  menuRef, 
  onOpenFilter,
  showSwipeView,
  setShowSwipeView
}) => {
  const [newsCards] = useState<NewsCard[]>([
    {
      id: "1",
      title: "Gemini 1.5 Flash: 1M Context Window",
      summary: "Google releases the fastest Gemini model yet with a massive context window.",
      fullContent: "Gemini 1.5 Flash is optimized for speed and efficiency at scale. It features a 1 million token context window, enabling complex reasoning over massive datasets. This model is ideal for real-time applications like the Viabhron OS.",
      source: "Google AI Blog",
      timestamp: "2h ago",
      category: "Models"
    },
    {
      id: "2",
      title: "Llama 3.1 405B: Open Weights Frontier",
      summary: "Meta's largest model yet rivals GPT-4o in reasoning and coding.",
      fullContent: "Llama 3.1 405B is the first open-weights model to truly rival the top proprietary models. It excels in multilingual translation, general knowledge, and complex reasoning. Meta has also released updated 8B and 70B versions.",
      source: "Meta AI",
      timestamp: "5h ago",
      category: "Open Source"
    }
  ]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Part: Status-style News */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Urgent Intelligence</h2>
          <div className="flex items-center gap-4 relative">
            <RefreshCw className="w-5 h-5 text-indigo-600" />
            <button onClick={onShowMenu}>
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div 
                  ref={menuRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-8 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50"
                >
                  {[
                    { label: "Mute Notifications", action: () => {} },
                    { label: "News Filters", action: onOpenFilter },
                    { label: "Clear News", action: () => {} }
                  ].map(item => (
                    <button 
                      key={item.label} 
                      onClick={item.action}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {newsCards.map(card => (
            <div 
              key={card.id}
              onClick={() => setShowSwipeView(true)}
              className="flex-shrink-0 w-32 h-44 bg-slate-900 rounded-2xl p-3 flex flex-col justify-between border-2 border-indigo-500/20 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-indigo-500/10" />
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center z-10 border-2 border-white shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-[10px] font-bold text-white leading-tight z-10 line-clamp-4 group-hover:scale-105 transition-transform">
                {card.title}
              </p>
            </div>
          ))}
          <div className="flex-shrink-0 w-32 h-44 bg-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 text-slate-400">
            <Plus className="w-6 h-6" />
            <span className="text-[9px] font-bold uppercase tracking-widest">More</span>
          </div>
        </div>
      </div>

      {/* Bottom Part: Channels Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 space-y-6">
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Intelligence Channels</h2>
          <div className="space-y-4">
            {[
              { name: "GitHub Sentinel", icon: <Terminal className="w-5 h-5" />, desc: "Trending AI Repos & MCP Servers", time: "12:45 PM", color: "bg-slate-900 text-white" },
              { name: "HuggingFace Pulse", icon: <Smile className="w-5 h-5" />, desc: "New Open Weights Models", time: "11:20 AM", color: "bg-yellow-400 text-slate-900" },
              { name: "Sovereign Alerts", icon: <Shield className="w-5 h-5" />, desc: "Critical System Updates", time: "Yesterday", color: "bg-indigo-600 text-white" }
            ].map(channel => (
              <div key={channel.name} className="flex items-center gap-4 group cursor-pointer">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${channel.color}`}>
                  {channel.icon}
                </div>
                <div className="flex-1 min-w-0 border-b border-slate-50 pb-4 group-last:border-none">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-slate-900 truncate">{channel.name}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">{channel.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{channel.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSwipeView && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-slate-900 z-[130] flex flex-col"
            style={{ top: '72px', bottom: '72px' }} // Sandwiched between bars
          >
            <div className="flex-1 overflow-x-auto snap-x snap-mandatory no-scrollbar flex">
              {newsCards.map(card => (
                <div key={card.id} className="h-full w-full flex-shrink-0 snap-start flex flex-col p-8 space-y-6 bg-slate-900 text-white relative">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{card.category}</span>
                    <h1 className="text-3xl font-bold leading-tight">{card.title}</h1>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <span>{card.source}</span>
                      <span>•</span>
                      <span>{card.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-slate-300 leading-relaxed space-y-4 overflow-y-auto no-scrollbar">
                    <p className="text-lg font-medium text-white">{card.summary}</p>
                    <p>{card.fullContent}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-8">
                    <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share to Agent</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Close Button */}
            <button 
              onClick={() => setShowSwipeView(false)}
              className="absolute bottom-6 right-6 w-14 h-14 bg-white text-slate-900 rounded-full shadow-2xl flex items-center justify-center z-[140] hover:scale-110 transition-transform active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
