
import React from 'react';
import { useERPStore } from '../store';
import { UserCheck, Award, TrendingUp, Shield, Clock, Search } from 'lucide-react';

export default function HR() {
  const { employees } = useERPStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workforce Hub</h1>
          <p className="text-slate-500">Manage employee certifications, performance, and field safety.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50">Reports</button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-emerald-700">Add Employee</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Workforce</p>
          <h3 className="text-3xl font-black text-slate-900">{employees.length}</h3>
          <p className="text-emerald-600 text-[10px] font-bold mt-2">100% active duty</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">ISA Certified</p>
          <h3 className="text-3xl font-black text-slate-900">42</h3>
          <p className="text-blue-600 text-[10px] font-bold mt-2">52% of technicians</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Avg Performance</p>
          <h3 className="text-3xl font-black text-slate-900">8.9</h3>
          <p className="text-slate-400 text-[10px] font-bold mt-2">System target: 8.5</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Safety Incident Rate</p>
          <h3 className="text-3xl font-black text-red-600">0.02</h3>
          <p className="text-red-400 text-[10px] font-bold mt-2">Down 12% from Q1</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2">
            <UserCheck size={20} className="text-emerald-600" />
            Active Employee Directory
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter roster..."
              className="bg-white border rounded-lg pl-9 pr-3 py-1 text-sm outline-none w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest text-left">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Utilization</th>
                <th className="px-6 py-4">Certifications</th>
                <th className="px-6 py-4 text-center">Safety Score</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.slice(0, 10).map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/${emp.id}/40/40`} className="h-9 w-9 rounded-full" alt="avatar" />
                      <div>
                        <p className="font-bold text-slate-900">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Branch: {emp.branchId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">{emp.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold w-10 text-right">{emp.utilization}%</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${emp.utilization}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {emp.certification.slice(0, 1).map(c => (
                        <span key={c} className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">{c}</span>
                      ))}
                      {emp.certification.length > 1 && <span className="text-slate-300 text-[10px] font-bold">+{emp.certification.length - 1}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center p-1 px-2 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold gap-1">
                      <Shield size={10} /> 9.8
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                      <TrendingUp size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
