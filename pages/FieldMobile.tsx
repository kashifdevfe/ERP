
import React, { useState } from 'react';
import { Camera, MapPin, Search, Bug, CheckCircle, Image as ImageIcon, Send } from 'lucide-react';

export default function FieldMobile() {
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const simulateAI = () => {
    setLoading(true);
    setTimeout(() => {
      setDiagnosis("EMERALD ASH BORER (EAB) DETECTED. 85% Confidence. Action required: Tree quarantine and chemical treatment plan.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center bg-slate-900 min-h-[calc(100vh-120px)] rounded-3xl p-8">
      <div className="w-[320px] h-[640px] bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-800 relative flex flex-col">
        {/* Status Bar */}
        <div className="h-6 bg-white w-full flex justify-between px-6 pt-2">
          <span className="text-[10px] font-bold">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-2 bg-slate-800 rounded-sm"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-sm"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <div className="bg-emerald-600 text-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-bold">Arborist Assistant</h2>
            <p className="text-[10px] opacity-80">Connected to Branch: NY-Central</p>
          </div>

          <div className="bg-slate-50 border rounded-2xl p-4">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Current Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="text-red-500" size={14} />
              <span className="text-xs font-bold">42 High Ridge Rd, Stamford</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Quick Actions</h3>
            <button 
              onClick={simulateAI}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
            >
              <Bug size={16} /> AI Pest Diagnosis
            </button>
            <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95">
              <Camera size={16} /> Capture Job Photos
            </button>
          </div>

          {loading && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-3 animate-pulse">
              <Search className="text-blue-500 animate-spin" size={16} />
              <span className="text-[10px] font-bold text-blue-700 uppercase">Analyzing foliage...</span>
            </div>
          )}

          {diagnosis && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="text-red-600 shrink-0" size={16} />
                <p className="text-[10px] font-black text-red-900 uppercase">Detection Alert</p>
              </div>
              <p className="text-[11px] text-red-700 leading-relaxed font-medium">
                {diagnosis}
              </p>
              <button className="mt-3 w-full bg-red-600 text-white py-1.5 rounded-lg text-[10px] font-bold">Generate Rescue Plan</button>
            </div>
          )}

          <div className="mt-auto space-y-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Before / After</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={20} />
                <span className="text-[8px] font-bold uppercase mt-1">Before</span>
              </div>
              <div className="aspect-square bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={20} />
                <span className="text-[8px] font-bold uppercase mt-1">After</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="h-14 bg-white border-t flex justify-around items-center px-4">
          <div className="text-emerald-600"><MapPin size={20} /></div>
          <div className="text-slate-400"><Search size={20} /></div>
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white -mt-8 shadow-lg border-4 border-white"><Send size={18} /></div>
          <div className="text-slate-400"><CheckCircle size={20} /></div>
          <div className="text-slate-400"><Camera size={20} /></div>
        </div>

        {/* Home Indicator */}
        <div className="h-5 bg-white w-full flex justify-center items-center pb-2">
          <div className="h-1 w-24 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

// Support functions
const AlertCircle = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
