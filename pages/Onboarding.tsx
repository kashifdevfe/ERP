
import React, { useState } from 'react';
import { Rocket, CheckCircle2, AlertTriangle, ArrowRight, Database, Download, CheckCircle } from 'lucide-react';
import { useERPStore } from '../store';

export const Onboarding = () => {
  const { branches } = useERPStore();
  const [step, setStep] = useState(1);
  const migratingBranch = branches.find(b => b.status === 'Migrating');

  const stats = [
    { label: 'Branches Integrated', value: '7', total: '10' },
    { label: 'Data Points Migrated', value: '450k', total: '1.2m' },
    { label: 'Integration Health', value: '94%', total: '100%' },
  ];

  const migrationItems = [
    { name: 'Customer Database', progress: 100, status: 'Done' },
    { name: 'Inventory Assets', progress: 100, status: 'Done' },
    { name: 'Employee Profiles', progress: 45, status: 'Processing' },
    { name: 'Historical Financials', progress: 0, status: 'Pending' },
    { name: 'Equipment Telematics', progress: 0, status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">M&A Integration Hub</h1>
          <p className="text-slate-500">Track and manage newly acquired branch data migrations.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-emerald-700">
          <Download size={18} />
          Import Legacy Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">{s.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{s.value}</h3>
            <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${(parseInt(s.value) / parseInt(s.total)) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Database size={20} />
              </div>
              <div>
                <h3 className="font-bold">Active Migration: {migratingBranch?.name}</h3>
                <p className="text-xs text-slate-500">Legacy System: Arborex-Pro v4.2</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-full animate-pulse">
              SYNC IN PROGRESS
            </span>
          </div>
          <div className="p-6 space-y-6">
            {migrationItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.name}</span>
                  <span className={`font-bold ${item.status === 'Done' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.status === 'Done' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50 border-t flex justify-between items-center">
            <p className="text-xs text-slate-500 font-medium italic">Est. completion: 12:45 PM Today</p>
            <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
              View Detailed Log <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-4">Onboarding Checklist</h3>
            <div className="space-y-4">
              {[
                { label: 'Security Protocols established', done: true },
                { label: 'Managerial training completed', done: true },
                { label: 'Equipment fleet tagged & tracked', done: false },
                { label: 'Payroll systems linked', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>
                  )}
                  <span className={`text-sm ${item.done ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex gap-4">
              <AlertTriangle className="text-amber-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-amber-900">Data Validation Warnings</h4>
                <p className="text-sm text-amber-700 mt-1">42 customers found with duplicate addresses. Manual reconciliation required to proceed with financial migration.</p>
                <button className="mt-3 text-sm font-bold text-white bg-amber-600 px-4 py-2 rounded-lg shadow-sm hover:bg-amber-700">
                  Resolve Conflicts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
