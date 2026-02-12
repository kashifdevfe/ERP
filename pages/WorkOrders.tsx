
import React from 'react';
import { useERPStore } from '../store';
import { Clock, MoreVertical, Plus, User, MapPin } from 'lucide-react';

export const WorkOrders = () => {
  const { tickets, customers, employees } = useERPStore();

  const columns = [
    { title: 'Scheduled', status: 'Scheduled', color: 'slate' },
    { title: 'In Progress', status: 'In Progress', color: 'blue' },
    { title: 'Completed', status: 'Completed', color: 'emerald' },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Work Order Manager</h1>
          <p className="text-slate-500">Track job progress and field technician assignments.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-sm transition-all">
          <Plus size={20} />
          Create New Job
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {columns.map((col) => (
          <div key={col.status} className="flex-1 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                {col.title}
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${col.color}-100 text-${col.color}-700`}>
                  {tickets.filter(t => t.status === col.status).length}
                </span>
              </h3>
              <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {tickets.filter(t => t.status === col.status).map((ticket) => {
                const customer = customers.find(c => c.id === ticket.customerId);
                const employee = employees.find(e => e.id === ticket.assignedTo);
                
                return (
                  <div 
                    key={ticket.id} 
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-move"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ticket.id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        ticket.priority === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{ticket.type}</h4>
                    <p className="text-xs text-slate-500 mb-4">{customer?.name}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <MapPin size={14} />
                        <span className="truncate">{customer?.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock size={14} />
                        <span>Created: {ticket.date}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img 
                          className="h-6 w-6 rounded-full ring-2 ring-emerald-50" 
                          src={`https://picsum.photos/seed/${employee?.id}/40/40`} 
                          alt="avatar" 
                        />
                        <span className="text-[10px] font-bold text-slate-700">{employee?.name || 'Unassigned'}</span>
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        ${ticket.revenue}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
