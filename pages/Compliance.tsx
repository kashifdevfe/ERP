
import React from 'react';
import { useERPStore } from '../store';
import { ShieldCheck, AlertTriangle, FileCheck, Map, Activity } from 'lucide-react';

export default function Compliance() {
  const { branches } = useERPStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance & Safety</h1>
          <p className="text-slate-500">OSHA tracking, incident reports, and branch risk assessments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Map className="text-red-500" size={20} />
              Risk Heatmap by Region
            </h3>
            <div className="grid grid-cols-5 gap-2 h-48">
              {branches.map(b => (
                <div 
                  key={b.id} 
                  className={`rounded-lg flex flex-col items-center justify-center p-2 text-white font-bold text-xs transition-transform hover:scale-105 cursor-help ${
                    b.healthScore < 70 ? 'bg-red-500' : b.healthScore < 85 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  title={`${b.name}: Risk ${100-b.healthScore}%`}
                >
                  <span>{b.state}</span>
                  <span className="opacity-70">{b.healthScore}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Low Risk (Healthy)</span>
              <span>High Risk (Warning)</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold flex items-center gap-2">
                <FileCheck className="text-emerald-600" size={20} />
                OSHA Compliance Checklists
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { title: 'Personal Protective Equipment (PPE) Review', branch: 'NY-Main', status: 'Compliant' },
                { title: 'Aerial Lift Safety Inspection', branch: 'CT-Central', status: 'Incomplete' },
                { title: 'Chemical Storage & Hazard Comm.', branch: 'NJ-South', status: 'Review Due' },
                { title: 'Chainsaw & Ground Tool Safety', branch: 'PA-East', status: 'Compliant' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50">
                  <div>
                    <p className="font-bold text-sm text-slate-900">{item.title}</p>
                    <p className="text-[10px] text-slate-500">Assigned Branch: {item.branch}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${
                    item.status === 'Compliant' ? 'bg-emerald-50 text-emerald-600' : 
                    item.status === 'Incomplete' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-600 text-white rounded-xl p-6 shadow-xl">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <AlertTriangle size={20} /> Incident Center
            </h3>
            <div className="space-y-4">
              <div className="bg-red-700/50 p-3 rounded-lg border border-red-500/50">
                <p className="text-xs font-bold">New Safety Report</p>
                <p className="text-[10px] opacity-70 mt-1">Struck by object incident in CT Branch. Supervisor notified.</p>
              </div>
              <button className="w-full bg-white text-red-600 font-bold py-2 rounded-lg text-sm hover:bg-slate-100 transition-all">
                File New Incident
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" />
              Compliance Score Trend
            </h3>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <span className="text-xl font-black text-slate-900">92%</span>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current enterprise safety rating.</p>
                <p className="text-emerald-600 font-bold text-xs">+3.5% vs Last Quarter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
