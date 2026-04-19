import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  EyeOff, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Activity, 
  Bell, 
  Search, 
  Settings, 
  Globe, 
  Database, 
  Terminal,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  RefreshCw,
  Share2,
  MessageSquare,
  Layers
} from 'lucide-react';

interface Watcher {
  id: string;
  name: string;
  type: 'LOG_REGEX' | 'FIRESTORE_CHANGE' | 'WEBHOOK' | 'HTTP_POLL';
  target: string;
  condition: string;
  status: 'active' | 'paused' | 'triggered' | 'error';
  lastTriggered?: string;
  priority: number;
}

export const Monitor: React.FC = () => {
  const [watchers, setWatchers] = useState<Watcher[]>([]);
  const [view, setView] = useState<'watchers' | 'bus'>('watchers');
  const [isAdding, setIsAdding] = useState(false);
  const [newWatcher, setNewWatcher] = useState<Partial<Watcher>>({
    type: 'HTTP_POLL',
    priority: 3,
    status: 'active'
  });

  const handleAddWatcher = () => {
    if (!newWatcher.name || !newWatcher.target) return;
    
    const watcher: Watcher = {
      id: `watcher-${Date.now()}`,
      name: newWatcher.name,
      type: newWatcher.type as any,
      target: newWatcher.target,
      condition: newWatcher.condition || '',
      status: 'active',
      priority: newWatcher.priority || 3
    };

    setWatchers([...watchers, watcher]);
    setIsAdding(false);
    setNewWatcher({ type: 'HTTP_POLL', priority: 3, status: 'active' });

    // Start monitor on backend
    fetch('/api/monitor/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(watcher)
    });
  };

  const toggleStatus = (id: string) => {
    setWatchers(watchers.map(w => {
      if (w.id === id) {
        const newStatus = w.status === 'active' ? 'paused' : 'active';
        
        // Update backend
        if (newStatus === 'active') {
          fetch('/api/monitor/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(w)
          });
        } else {
          fetch('/api/monitor/stop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
        }
        
        return { ...w, status: newStatus };
      }
      return w;
    }));
  };

  const deleteWatcher = (id: string) => {
    setWatchers(watchers.filter(w => w.id !== id));
    fetch('/api/monitor/stop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
  };

  const getTypeIcon = (type: Watcher['type']) => {
    switch (type) {
      case 'HTTP_POLL': return <Globe className="w-4 h-4" />;
      case 'FIRESTORE_CHANGE': return <Database className="w-4 h-4" />;
      case 'LOG_REGEX': return <Terminal className="w-4 h-4" />;
      case 'WEBHOOK': return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full bg-[#050508] flex flex-col font-sans overflow-hidden">
      {/* Header HUD */}
      <div className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-600/10 rounded-xl">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Monitor</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Event-Driven Intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setView('watchers')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'watchers' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Watchers
            </button>
            <button 
              onClick={() => setView('bus')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'bus' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Event Bus
            </button>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-600/20"
        >
          <Plus className="w-3.5 h-3.5" />
          {view === 'watchers' ? 'Deploy Watcher' : 'New Subscription'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {view === 'watchers' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard icon={Activity} label="Active Watchers" value={watchers.filter(w => w.status === 'active').length.toString()} color="text-purple-400" />
              <StatCard icon={Zap} label="Events (24h)" value="0" color="text-blue-400" />
              <StatCard icon={Clock} label="Avg. Latency" value="120ms" color="text-green-400" />
              <StatCard icon={RefreshCw} label="Token Savings" value="~1.2k" color="text-yellow-400" />
            </div>

            {/* Watcher List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Watchers</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Monitor Engine Online</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <AnimatePresence mode="popLayout">
                  {watchers.map((w) => (
                    <motion.div 
                      key={w.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`bg-gray-900/50 border rounded-2xl p-4 flex items-center justify-between group transition-all ${w.status === 'paused' ? 'border-white/5 opacity-60' : 'border-white/10 shadow-lg shadow-white/5'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl border ${w.status === 'active' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-gray-800 border-white/5 text-gray-500'}`}>
                          {getTypeIcon(w.type)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-2">
                            {w.name}
                            {w.status === 'active' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />}
                          </div>
                          <div className="flex items-center gap-3 text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                            <span>{w.target}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-700" />
                            <span className="text-blue-400">Priority: {w.priority}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleStatus(w.id)}
                          className={`p-2 rounded-lg transition-all ${w.status === 'active' ? 'text-yellow-500 hover:bg-yellow-500/10' : 'text-green-500 hover:bg-green-500/10'}`}
                        >
                          {w.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => deleteWatcher(w.id)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {watchers.length === 0 && !isAdding && (
                  <div className="py-20 flex flex-col items-center justify-center text-gray-600 space-y-4">
                    <Activity className="w-12 h-12 opacity-20" />
                    <p className="text-xs font-bold uppercase tracking-widest opacity-40">No watchers deployed</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Event Bus Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-900/40 border border-white/5 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-blue-400" />
                      Live Event Stream
                    </h3>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      SEB Kernel Active
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <EventItem topic="security.alert" publisher="Sentinel" priority="critical" time="Just Now" />
                    <EventItem topic="fiscal.threshold" publisher="Comptroller" priority="high" time="2m ago" />
                    <EventItem topic="code.change" publisher="Forge" priority="medium" time="15m ago" />
                    <EventItem topic="nexus.sync" publisher="Librarian" priority="low" time="1h ago" />
                  </div>
                </div>

                <div className="bg-gray-900/40 border border-white/5 rounded-3xl p-6">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Active Subscriptions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <SubscriptionCard agent="Sentinel" topic="kernel.*" status="active" />
                    <SubscriptionCard agent="Comptroller" topic="fiscal.*" status="active" />
                    <SubscriptionCard agent="Librarian" topic="nexus.sync" status="active" />
                    <SubscriptionCard agent="Forge" topic="code.audit" status="active" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-600/5 border border-purple-500/20 rounded-3xl p-6">
                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">Bus Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">Throughput</span>
                      <span className="text-xs font-bold text-white">124 msg/hr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">Active Topics</span>
                      <span className="text-xs font-bold text-white">18</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">Avg. Wake-up</span>
                      <span className="text-xs font-bold text-emerald-400">45ms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-6">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Reactive Logic</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-bold">
                    The SEB Kernel ensures agents only consume tokens when subscribed topics publish high-priority events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Watcher Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-gray-900 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Deploy New Watcher</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Configure your background sentinel</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Watcher Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. GitHub Mirror Watcher"
                    value={newWatcher.name || ''}
                    onChange={(e) => setNewWatcher({ ...newWatcher, name: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Type</label>
                    <select 
                      value={newWatcher.type}
                      onChange={(e) => setNewWatcher({ ...newWatcher, type: e.target.value as any })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all"
                    >
                      <option value="HTTP_POLL">HTTP Poll</option>
                      <option value="FIRESTORE_CHANGE">Firestore</option>
                      <option value="LOG_REGEX">Log Regex</option>
                      <option value="WEBHOOK">Webhook</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Priority</label>
                    <select 
                      value={newWatcher.priority}
                      onChange={(e) => setNewWatcher({ ...newWatcher, priority: parseInt(e.target.value) })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all"
                    >
                      <option value="1">1 (Low)</option>
                      <option value="3">3 (Normal)</option>
                      <option value="5">5 (Critical)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Target URL / Path</label>
                  <input 
                    type="text" 
                    placeholder="https://api.github.com/..."
                    value={newWatcher.target || ''}
                    onChange={(e) => setNewWatcher({ ...newWatcher, target: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Condition (Regex/Logic)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. status == 'success'"
                    value={newWatcher.condition || ''}
                    onChange={(e) => setNewWatcher({ ...newWatcher, condition: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddWatcher}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-600/20"
                >
                  Deploy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 space-y-2">
    <div className="flex items-center gap-2 text-gray-500">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
  </div>
);

const EventItem = ({ topic, publisher, priority, time }: { topic: string, publisher: string, priority: string, time: string }) => (
  <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-xl hover:border-blue-500/30 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-1.5 h-8 rounded-full ${
        priority === 'critical' ? 'bg-red-500' : 
        priority === 'high' ? 'bg-orange-500' : 
        priority === 'medium' ? 'bg-blue-500' : 'bg-gray-500'
      }`} />
      <div>
        <div className="text-[11px] font-bold text-white uppercase tracking-wider">{topic}</div>
        <div className="text-[9px] text-gray-500 uppercase font-bold">Pub: {publisher}</div>
      </div>
    </div>
    <div className="text-right">
      <div className={`text-[9px] font-bold uppercase ${
        priority === 'critical' ? 'text-red-400' : 'text-gray-500'
      }`}>{priority}</div>
      <div className="text-[8px] text-gray-600 uppercase font-bold">{time}</div>
    </div>
  </div>
);

const SubscriptionCard = ({ agent, topic, status }: { agent: string, topic: string, status: string }) => (
  <div className="p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-3 h-3 text-purple-400" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{agent}</span>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
    </div>
    <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Topic Pattern:</div>
    <div className="text-[10px] font-mono text-purple-400 bg-purple-400/5 px-2 py-1 rounded border border-purple-500/10">{topic}</div>
  </div>
);
