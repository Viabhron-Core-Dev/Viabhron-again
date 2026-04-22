import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  ShieldCheck, 
  RefreshCw,
  Eye,
  EyeOff,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface TerminalAccreditationProps {
  onClose: () => void;
}

export const TerminalAccreditation: React.FC<TerminalAccreditationProps> = ({ onClose }) => {
  const [secretKey, setSecretKey] = useState("");
  const [relayBot, setRelayBot] = useState("");
  const [terminalId, setTerminalId] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [step, setStep] = useState<"generate" | "display">("generate");

  useEffect(() => {
    generateNewManifest();
  }, []);

  const generateNewManifest = () => {
    // Generate a random high-entropy secret key
    const array = new Uint32Array(8);
    window.crypto.getRandomValues(array);
    const key = Array.from(array).map(b => b.toString(16).padStart(8, '0')).join('');
    
    setSecretKey(key);
    setRelayBot("@viabhron_relay_bot"); // Example placeholder
    setTerminalId(`SOVEREIGN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
  };

  const manifest = JSON.stringify({
    version: "1.0",
    id: terminalId,
    secret_key: secretKey,
    relay_bot: relayBot,
    algorithm: "HMAC-SHA256"
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const downloadManifest = () => {
    const blob = new Blob([manifest], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vaa_relay_${terminalId.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Manifest file downloaded");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none">Accreditation</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Hatch Local Terminal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Security Alert */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-[10px] text-amber-800 font-black uppercase tracking-tight">Zero-Trust Warning</p>
              <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                This manifest is your primary sovereignty key. Never share this QR or JSON. 
                It allows your terminal to execute "Ghost Hands" actions as you.
              </p>
            </div>
          </div>

          {/* QR Area */}
          <div className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100 border border-slate-200 mb-6 relative group">
              <QRCodeCanvas 
                value={manifest}
                size={220}
                level="H"
                includeMargin={false}
                className="rounded-lg"
              />
              <div className="absolute inset-x-0 -bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={generateNewManifest}
                  className="bg-slate-800 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-800">Scan via Vaa Terminal Software</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-black">{terminalId}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secret Sovereign Key</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowKey(!showKey)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => copyToClipboard(secretKey, "Secret Key")} className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono text-[10px] break-all leading-relaxed text-slate-600">
                {showKey ? secretKey : "••••••••••••••••••••••••••••••••••••••••••••••••"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 text-center block">Transport Box</label>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center font-bold text-xs text-slate-700">
                  {relayBot}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 text-center block">Protocol</label>
                <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 text-center font-black text-[10px] text-indigo-600 uppercase tracking-tight">
                  Ghost Hands v1.0
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button 
            onClick={downloadManifest}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-all"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            Download JSON
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            I Have Secured It
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
