
import React, { useState } from 'react';
import { useERPStore } from '../store';
import { Search, Filter, Mail, Phone, MapPin, TrendingUp, AlertCircle, Plus, ChevronRight } from 'lucide-react';

export default function CRM() {
  const { customers } = useERPStore();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer 360</h1>
          <p className="text-slate-500">Manage client relationships and property history.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-sm transition-all">
          <Plus size={20} />
          New Customer
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium flex items-center gap-2 hover:bg-slate-50">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(0, 12).map((cust) => (
          <div key={cust.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
            <div className="p-5 border-b border-slate-50">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg">
                  {cust.name.charAt(0)}
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                  cust.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cust.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 truncate">{cust.name}</h3>
              <p className="text-xs text-slate-500 truncate mb-4">{cust.email}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin size={14} className="text-slate-400" />
                  <span className="truncate">{cust.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone size={14} className="text-slate-400" />
                  <span>{cust.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50/50 flex justify-between items-center text-xs">
              <div className="flex flex-col">
                <span className="text-slate-400 uppercase tracking-widest text-[8px] font-bold">Risk Score</span>
                <span className={`font-bold ${cust.riskScore > 70 ? 'text-red-600' : 'text-emerald-600'}`}>{cust.riskScore}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-slate-400 uppercase tracking-widest text-[8px] font-bold">LTV</span>
                <span className="font-bold text-slate-900">${cust.ltv.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="p-2 border-t flex justify-center group-hover:bg-emerald-50 transition-colors">
              <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
