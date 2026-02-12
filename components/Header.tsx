
import React from 'react';
import { Bell, Search, CloudLightning, Sun, Moon } from 'lucide-react';
import { useERPStore } from '../store';

export const Header = () => {
  const { stormMode, toggleStormMode, role, setRole, activeBranchId, setActiveBranch, branches } = useERPStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6 w-full max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search customers, tickets, branches..."
            className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        
        <select 
          value={activeBranchId || ''}
          onChange={(e) => setActiveBranch(e.target.value || null)}
          className="bg-slate-100 border-none rounded-lg py-2 px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Branches</option>
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleStormMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
            stormMode 
              ? 'bg-red-600 text-white shadow-lg animate-pulse' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <CloudLightning size={16} />
          {stormMode ? 'STORM MODE ACTIVE' : 'Storm Mode'}
        </button>

        <select 
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg py-2 px-3 text-sm font-bold outline-none"
        >
          <option value="Admin">Admin View</option>
          <option value="Dispatcher">Dispatcher View</option>
          <option value="Arborist">Arborist View</option>
        </select>

        <div className="h-8 w-px bg-slate-200"></div>

        <button className="relative text-slate-500 hover:text-slate-700 p-2">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Chief Executive</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest">{role}</p>
          </div>
          <img 
            src="https://picsum.photos/seed/savatree/100/100" 
            className="h-9 w-9 rounded-full ring-2 ring-emerald-100 object-cover" 
            alt="Profile"
          />
        </div>
      </div>
    </header>
  );
};
