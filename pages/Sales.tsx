
import React, { useState } from 'react';
import { Plus, Trash2, FileText, Send, DollarSign, PieChart as PieIcon } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SERVICES = [
  { id: '1', name: 'Tree Removal (Large)', price: 1200 },
  { id: '2', name: 'Standard Pruning', price: 450 },
  { id: '3', name: 'Deep Root Fertilization', price: 250 },
  { id: '4', name: 'Pest Inspection', price: 150 },
];

const forecastData = [
  { month: 'Jan', actual: 4000, projected: 4200 },
  { month: 'Feb', actual: 3000, projected: 3500 },
  { month: 'Mar', actual: 5000, projected: 5500 },
  { month: 'Apr', actual: 4500, projected: 6000 },
  { month: 'May', actual: 0, projected: 7500 },
  { month: 'Jun', actual: 0, projected: 8200 },
];

export default function Sales() {
  const [quoteItems, setQuoteItems] = useState<{id: string, name: string, price: number, qty: number}[]>([]);

  const addItem = (service: typeof SERVICES[0]) => {
    setQuoteItems([...quoteItems, { ...service, qty: 1 }]);
  };

  const removeItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const total = quoteItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales & Estimating</h1>
          <p className="text-slate-500">Build high-conversion quotes and track revenue pipelines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText className="text-emerald-600" size={20} />
              New Estimate Builder
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-2 pb-4 overflow-x-auto">
                {SERVICES.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => addItem(s)}
                    className="whitespace-nowrap bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                  >
                    + {s.name}
                  </button>
                ))}
              </div>

              <div className="border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-bold">
                    <tr>
                      <th className="px-4 py-3 text-left">Service</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                      <th className="px-4 py-3 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {quoteItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">No items added yet.</td>
                      </tr>
                    ) : (
                      quoteItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-medium">{item.name}</td>
                          <td className="px-4 py-3 text-right">${item.price}</td>
                          <td className="px-4 py-3 text-center">{item.qty}</td>
                          <td className="px-4 py-3 text-right font-bold">${item.price * item.qty}</td>
                          <td className="px-4 py-3 text-center">
                            <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Grand Total</p>
                  <h2 className="text-3xl font-black text-slate-900">${total.toLocaleString()}</h2>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                <Send size={18} /> Send Quote to Client
              </button>
              <button className="px-6 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-all">
                Save Draft
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900">
              <PieIcon size={20} className="text-blue-500" />
              Pipeline Forecast
            </h3>
            <div className="h-[200px] -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="projected" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProj)" strokeWidth={2} />
                  <Area type="monotone" dataKey="actual" stroke="#10b981" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Projected May</p>
                <p className="text-lg font-black text-blue-900">$7.5k</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Actual YTD</p>
                <p className="text-lg font-black text-emerald-900">$12.0k</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold mb-4 text-emerald-400">Sales Performance</h3>
            <div className="space-y-4">
              {[
                { label: 'Close Rate', val: '64%' },
                { label: 'Avg Quote Size', val: '$2,450' },
                { label: 'Response Time', val: '2.4h' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                  <span className="font-bold">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
