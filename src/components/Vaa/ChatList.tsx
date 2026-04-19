import React from "react";
import { Terminal, Shield, Cpu, MessageSquare } from "lucide-react";
import { CelestialChat } from "../../types";

interface ChatListProps {
  chats: CelestialChat[];
  onSelectChat: (chat: CelestialChat) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-4 space-y-2">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onSelectChat(chat)}
          className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer rounded-2xl transition-all border border-transparent hover:border-slate-100 group"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm border-2 transition-transform group-active:scale-95 ${
            chat.type === 'sentinel' ? 'bg-red-50 text-red-500 border-red-100' : 
            chat.isHeadAgent ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
            'bg-indigo-50 text-indigo-500 border-indigo-100'
          }`}>
            {chat.type === 'sentinel' ? <Terminal className="w-7 h-7" /> : 
             chat.isHeadAgent ? <Shield className="w-7 h-7" /> : 
             <Cpu className="w-7 h-7" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-slate-900 truncate">{chat.name}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                chat.type === 'sentinel' ? 'bg-red-100 text-red-600' : 
                chat.isHeadAgent ? 'bg-emerald-100 text-emerald-600' :
                'bg-indigo-100 text-indigo-600'
              }`}>
                {chat.isHeadAgent ? "ROOT" : chat.type?.toUpperCase() || "AGENT"}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate mt-1 leading-tight">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
