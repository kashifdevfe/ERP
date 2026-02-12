
import React from 'react';
import { useERPStore } from '../store';
// Updated the import to use 'Wrench' instead of 'Tool' as 'Tool' is not exported by 'lucide-react'
import { Truck, Activity, Gauge, Wrench, MapPin, Calendar } from 'lucide-react';

export default function Equipment() {
  const { equipment } = useERPStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet & Telematics</h1>
          <p className="text-slate-500">Monitor equipment health, utilization, and maintenance cycles.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-emerald-700">
          Sync GPS Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipment.map(unit => (
              <div key={unit.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-emerald-200 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-900 text-white rounded-xl">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-600">{unit.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{unit.type}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                    unit.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {unit.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                      <Gauge size={12} /> Hours
                    </div>
                    <p className="text-lg font-black text-slate-900">{unit.hours.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                      <Activity size={12} /> Utilization
                    </div>
                    <p className="text-lg font-black text-slate-900">{unit.utilization}%</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                    {/* Replaced <Tool /> with <Wrench /> */}
                    <Wrench size={12} /> Service Due
                  </div>
                  <span className="text-xs font-bold text-slate-900">{unit.nextMaintenance} hrs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl">
            <h3 className="font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <Activity size={20} /> System Diagnostics
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Fleet Health', val: 94, color: 'emerald' },
                { label: 'Fuel Efficiency', val: 82, color: 'blue' },
                { label: 'Idle Time Reduction', val: 15, color: 'amber' },
              ].map(stat => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span>{stat.label}</span>
                    <span className={`text-${stat.color}-400`}>{stat.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-${stat.color}-500`} style={{ width: `${stat.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-4">Upcoming Fleet Maintenance</h3>
            <div className="space-y-4">
              {[
                { unit: 'Unit 102', task: 'Hydraulic System Flush', date: 'In 3 days' },
                { unit: 'Unit 405', task: 'Tire Replacement', date: 'In 1 week' },
                { unit: 'Unit 221', task: 'Annual Safety Inspection', date: 'Pending' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="p-2 bg-white rounded-lg text-slate-400 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.unit} - {item.task}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
