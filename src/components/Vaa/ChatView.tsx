import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Terminal, 
  MoreVertical, 
  ShieldCheck, 
  Paperclip, 
  Zap, 
  Send,
  X,
  User,
  Shield,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CelestialChat, Message } from "../../types";

interface ChatViewProps {
  chat: CelestialChat;
  onBack: () => void;
  onSendMessage: (content: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  chat, 
  onBack, 
  onSendMessage
}) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isSentinel = chat.isSentinel || chat.type === 'sentinel';
  const isHead = chat.isHeadAgent;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="bg-wa-header text-white p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/10 flex-shrink-0">
              {isHead ? <Shield className="w-5 h-5" /> : isSentinel ? <Terminal className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold truncate">{chat.name}</h3>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest truncate">
                {isHead ? "Root Authority" : isSentinel ? "Security Feed" : "Agent Active"}
              </p>
            </div>
          </div>
        </div>
        <button className="p-1 hover:bg-white/10 rounded-full">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none electricity-grid"></div>
        
        {chat.messages.map((msg, idx) => (
          <div 
            key={msg.id || idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm relative ${
              msg.role === 'user' 
                ? 'bg-[#dcf8c6] text-slate-800 rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className="text-[9px] text-slate-400 mt-1 flex justify-end">
                {typeof msg.timestamp === 'string' ? msg.timestamp.split('T')[1].slice(0, 5) : '00:00'}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-200 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
          <input 
            type="text"
            placeholder="Chairman's command..."
            className="flex-1 bg-transparent outline-none text-sm py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <div className="flex items-center gap-3">
            <Paperclip className="w-5 h-5 text-slate-400 cursor-pointer" />
            <Zap className="w-5 h-5 text-wa-accent cursor-pointer" />
          </div>
        </div>
        <button 
          onClick={handleSend}
          className="w-12 h-12 bg-wa-header text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <Send className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};
