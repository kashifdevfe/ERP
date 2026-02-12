
import React from 'react';
import { useERPStore } from '../store';
import { Package, AlertTriangle, Truck, RefreshCcw, Layers } from 'lucide-react';

export default function Inventory() {
  const { inventory } = useERPStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enterprise Inventory</h1>
          <p className="text-slate-500">Monitor supply levels across all branches and manage procurement.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 flex items-center gap-2">
            <Truck size={18} /> Transfer Stock
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 flex items-center gap-2 shadow-sm">
            <RefreshCcw size={18} /> Bulk Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Valuation</p>
          <h3 className="text-3xl font-black text-slate-900">$842,500</h3>
          <p className="text-emerald-600 text-[10px] font-bold mt-2">+4.2% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Active SKUs</p>
          <h3 className="text-3xl font-black text-slate-900">1,240</h3>
          <p className="text-slate-400 text-[10px] font-bold mt-2">12 new added this week</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">Critical Stock</p>
          <h3 className="text-3xl font-black text-slate-900">8</h3>
          <p className="text-red-400 text-[10px] font-bold mt-2">Requires immediate reorder</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">In Transit</p>
          <h3 className="text-3xl font-black text-slate-900">14</h3>
          <p className="text-blue-400 text-[10px] font-bold mt-2">Next delivery: Tomorrow</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2">
            <Layers size={20} className="text-slate-600" />
            Stock Inventory Detail
          </h3>
          <div className="flex gap-2">
            <select className="bg-white border rounded-lg px-3 py-1 text-xs outline-none">
              <option>All Categories</option>
              <option>Chemicals</option>
              <option>Parts</option>
              <option>Tools</option>
            </select>
          </div>
        </div>
        
        <table className="w-full">
          <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Stock Level</th>
              <th className="px-6 py-3">Min Level</th>
              <th className="px-6 py-3 text-right">Unit Price</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Package size={16} className="text-slate-600" />
                    </div>
                    <span className="font-bold text-slate-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{item.stock} {item.unit}</span>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.stock <= item.minStock ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, (item.stock / 500) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">{item.minStock}</td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">${item.price}</td>
                <td className="px-6 py-4 text-right">
                  {item.stock <= item.minStock ? (
                    <span className="flex items-center justify-end gap-1 text-red-600 font-bold text-xs uppercase tracking-tighter animate-pulse">
                      <AlertTriangle size={12} /> Low Stock
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-bold text-xs uppercase tracking-tighter">Healthy</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
