import React, { useState } from "react";
import { 
  Egg, 
  Search, 
  RefreshCw, 
  Globe, 
  Plus, 
  Zap, 
  Sparkles,
  ChevronRight,
  Database,
  Layers,
  Terminal,
  Cpu,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderTabProps {
  onOpenHatchery: () => void;
  onRefresh: () => void;
}

export const LoaderTab: React.FC<LoaderTabProps> = ({ onOpenHatchery, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [seeds] = useState([
    { id: "s1", name: "Llama-3.1-405B-Instruct", type: "Model Egg", size: "820GB", status: "Available", color: "bg-indigo-500" },
    { id: "s2", name: "Gemini-1.5-Pro-Sovereign", type: "Logic Egg", size: "Cloud", status: "Linked", color: "bg-blue-500" },
    { id: "s3", name: "Viabhron-Core-Substrate", type: "Kernel Egg", size: "12MB", status: "Installed", color: "bg-slate-900" },
    { id: "s4", name: "Sentinel-Guardian-v4", type: "Security Egg", size: "45MB", status: "Active", color: "bg-orange-500" }
  ]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hatchery Loader</h2>
          <RefreshCw 
            onClick={onRefresh}
            className="w-5 h-5 text-indigo-600 cursor-pointer hover:rotate-180 transition-transform duration-500" 
          />
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for Seeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        {/* Ignition Card */}
        <div 
          onClick={onOpenHatchery}
          className="bg-indigo-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-white text-indigo-600 flex items-center justify-center shadow-lg">
              <Egg className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Hatch New Seed</h3>
              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mt-1">Sovereign Ingestion Ignition</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {["All Seeds", "Models", "Security", "Tools", "Data"].map((cat) => (
            <button 
              key={cat}
              className="px-6 py-2.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm whitespace-nowrap hover:bg-slate-50 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Seed List */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detected Substrate Seeds</h3>
          {seeds.map(seed => (
            <div 
              key={seed.id}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${seed.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {seed.type === "Model Egg" ? <Zap className="w-6 h-6" /> : 
                   seed.type === "Logic Egg" ? <Brain className="w-6 h-6" /> :
                   seed.type === "Security Egg" ? <Shield className="w-6 h-6" /> :
                   <Database className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{seed.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{seed.type}</span>
                    <span className="text-[8px] text-slate-200">•</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{seed.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-black uppercase tracking-widest ${seed.status === 'Active' ? 'text-green-500' : 'text-indigo-500'}`}>
                  {seed.status}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="pt-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Layers className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Matrix Status: Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Brain = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.23 3.43 3.43 0 0 0 5.159 2.071c.605.213 1.258.337 1.936.337s1.331-.124 1.936-.337a3.43 3.43 0 0 0 5.159-2.07 4 4 0 0 0 .52-8.23 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5Z" />
    <path d="M9 13a4.5 4.5 0 0 0 3-4" />
    <path d="M12 13a4.5 4.5 0 0 1 3-4" />
    <path d="M12 13v8" />
  </svg>
);
