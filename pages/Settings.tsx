
import React, { useState } from 'react';
import { useERPStore } from '../store';
import { Settings as SettingsIcon, Bell, Shield, Database, Cloud, Palette, Globe } from 'lucide-react';

export default function Settings() {
  const { role, setRole, toggleStormMode, stormMode } = useERPStore();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Preferences</h1>
        <p className="text-slate-500">Configure global ERP behavior, security, and notification triggers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold transition-all">
            <Globe size={18} /> General
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium transition-all">
            <Shield size={18} /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium transition-all">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium transition-all">
            <Palette size={18} /> Appearance
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium transition-all text-red-600">
            <Database size={18} /> Data Backup
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h3 className="font-bold border-b pb-4">General Configuration</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Storm Mode Simulation</p>
                <p className="text-xs text-slate-500">Auto-prioritize emergency tickets and notify all dispatchers.</p>
              </div>
              <button 
                onClick={toggleStormMode}
                className={`w-12 h-6 rounded-full transition-all relative ${stormMode ? 'bg-red-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${stormMode ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Push Notifications</p>
                <p className="text-xs text-slate-500">Enable real-time SMS and App alerts for field technicians.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <p className="font-bold text-slate-900">Current Simulation Role</p>
              <div className="grid grid-cols-3 gap-2">
                {['Admin', 'Dispatcher', 'Arborist'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r as any)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      role === r ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold border-b pb-4 flex items-center gap-2">
              <Cloud size={18} className="text-blue-500" /> Weather API Integration
            </h3>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm font-bold">72°</div>
              <div>
                <p className="text-xs font-bold text-blue-900">Stamford, CT (HQ)</p>
                <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest">Sunny - High winds expected tomorrow</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
            <button className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-700 transition-all">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
