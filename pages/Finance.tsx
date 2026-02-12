
import React from 'react';
import { useERPStore } from '../store';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';

const revData = [
  { month: 'Q1', rev: 1.2, exp: 0.8 },
  { month: 'Q2', rev: 1.5, exp: 0.9 },
  { month: 'Q3', rev: 1.8, exp: 1.1 },
  { month: 'Q4', rev: 2.1, exp: 1.2 },
];

export default function Finance() {
  const { invoices } = useERPStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Suite</h1>
          <p className="text-slate-500">Global revenue tracking, expenses, and accounts receivable.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-emerald-700">
          Generate Financial PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Net Profit', val: '$4.2M', trend: '+14%', color: 'emerald' },
          { label: 'Pending Rev', val: '$1.8M', trend: '+22%', color: 'blue' },
          { label: 'Accounts Rec.', val: '$450k', trend: '-2%', color: 'amber' },
          { label: 'Burn Rate', val: '$320k/mo', trend: '+1%', color: 'red' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <DollarSign className="text-emerald-600" size={20} />
            Profit & Loss Performance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="rev" name="Revenue ($M)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="exp" name="Expenses ($M)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50">
            <h3 className="font-bold">Recent Invoices</h3>
            <button className="text-emerald-600 text-xs font-bold uppercase hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y">
                {invoices.slice(0, 10).map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{inv.id}</p>
                      <p className="text-[10px] text-slate-500">{inv.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-900">
                      ${inv.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
