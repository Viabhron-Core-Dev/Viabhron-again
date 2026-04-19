import React from 'react';
import { 
  X, 
  Pause, 
  Play, 
  Maximize2, 
  Minimize2,
  Snowflake,
  Send,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CelestialChat } from '../types';

interface SubstrateFrameProps {
  name: string;
  isFrozen?: boolean;
  isFullscreen?: boolean;
  onClose: () => void;
  onToggleFreeze: () => void;
  onToggleFullscreen?: () => void;
  headChat?: CelestialChat;
  onSendMessage?: (content: string) => void;
  children: React.ReactNode;
}

/**
 * MOSS Substrate Frame
 * The secure bulkhead container for running Spores.
 */
export const SubstrateFrame: React.FC<SubstrateFrameProps> = ({
  name,
  isFrozen,
  isFullscreen,
  onClose,
  onToggleFreeze,
  onToggleFullscreen,
  headChat,
  onSendMessage,
  children
}) => {
  const [showPipOmega, setShowPipOmega] = React.useState(false);
  const [pipMessage, setPipMessage] = React.useState('');
  const chatScrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [headChat?.messages, showPipOmega]);

  const handleSend = () => {
    if (!pipMessage.trim() || !onSendMessage) return;
    onSendMessage(pipMessage);
    setPipMessage('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`${isFullscreen ? 'fixed inset-0 z-[200]' : 'absolute inset-0 z-[100]'} bg-white flex flex-col`}
    >
      {/* MOSS Frame Top Bar */}
      <div className={`flex-shrink-0 bg-wa-header flex items-center justify-between px-3 shadow-md z-[110] ${isFullscreen ? 'pt-safe h-[calc(3rem+env(safe-area-inset-top))]' : 'h-12'}`}>
        <div className="flex items-center gap-3">
          {/* Omega Executive Glyph: FIRST */}
          <button 
            onClick={() => setShowPipOmega(!showPipOmega)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              showPipOmega ? 'bg-white text-indigo-600' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span className="text-sm font-black">Ω</span>
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />

          <div className={`w-2 h-2 rounded-full ${isFrozen ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] truncate max-w-[120px]">
            {name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={onToggleFreeze}
            className={`p-1.5 rounded-lg transition-all ${isFrozen ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
            title={isFrozen ? "Thaw Spore" : "Freeze Spore"}
          >
            {isFrozen ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          
          <button 
            onClick={onToggleFullscreen}
            className={`p-1.5 rounded-lg transition-all text-white/70 hover:text-white hover:bg-white/10`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <div className="w-px h-4 bg-white/20 mx-1" />
          <button 
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-red-500/80 rounded-lg transition-all font-black text-sm"
            title="Purge Spore"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PIP Neural Window (Omega Assistant) */}
      <AnimatePresence>
        {showPipOmega && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-14 left-3 right-3 max-h-[40%] bg-slate-900 shadow-2xl rounded-3xl z-[120] flex flex-col border border-white/10 overflow-hidden"
          >
            <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Link: Resident Agent</span>
              </div>
              <button onClick={() => setShowPipOmega(false)} className="text-white/40 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div 
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-slate-900/50"
            >
              <div className="text-[9px] text-indigo-400/60 uppercase tracking-[0.2em] text-center mb-4 font-bold">
                Contextual Overlay Active
              </div>
              {headChat?.messages.slice(-5).map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white/10 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white/5 border-t border-white/5 flex gap-2">
              <input 
                value={pipMessage}
                onChange={(e) => setPipMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Direct command..."
                className="flex-1 bg-white/5 text-white text-xs px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-500"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"
              >
                <div className="w-4 h-4"><Send className="w-full h-full" /></div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spore Content */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <div className={`h-full transition-all duration-500 ${isFrozen ? 'filter grayscale brightness-90 pointer-events-none' : ''}`}>
          {children}
        </div>

        {/* Moss Frost Overlay */}
        <AnimatePresence>
          {isFrozen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px] pointer-events-none"
            >
              <div className="relative">
                <Snowflake className="w-16 h-16 text-blue-500/20 animate-pulse" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-white/90 border border-slate-100 px-6 py-2 rounded-2xl shadow-xl">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Metabolic Stasis</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
