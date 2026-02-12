
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useERPStore } from '../store';
import { Clock, User, AlertCircle, Phone } from 'lucide-react';

export const Dispatch = () => {
  const { customers, tickets, employees, stormMode } = useERPStore();
  
  // Filter for active/scheduled tickets to show on map
  const activeTickets = tickets.filter(t => t.status !== 'Completed').slice(0, 15);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="font-bold">Global Dispatch Map</h2>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Scheduled</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> In Progress</div>
            <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Emergency</div>
          </div>
        </div>
        <div className="flex-1 relative z-0">
          <MapContainer center={[41.0, -73.5]} zoom={9} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeTickets.map((ticket) => {
              const customer = customers.find(c => c.id === ticket.customerId);
              if (!customer) return null;
              
              return (
                <Marker key={ticket.id} position={[customer.lat, customer.lng]}>
                  <Popup>
                    <div className="p-1">
                      <p className="font-bold text-sm mb-1">{customer.name}</p>
                      <p className="text-xs text-slate-500 mb-2">{ticket.type}</p>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">
                        <User size={10} /> Assigned to: {employees.find(e => e.id === ticket.assignedTo)?.name || 'Unassigned'}
                      </div>
                      <button className="w-full mt-2 bg-emerald-600 text-white text-[10px] py-1 rounded font-bold">Reschedule</button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      <div className="w-96 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex-1 flex flex-col">
          <h3 className="font-bold mb-4 flex items-center justify-between">
            Live Ticket Queue
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">{activeTickets.length} Active</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {activeTickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className={`p-3 rounded-lg border-l-4 transition-all hover:translate-x-1 cursor-pointer ${
                  ticket.priority === 'Emergency' ? 'bg-red-50 border-red-500' : 
                  ticket.status === 'In Progress' ? 'bg-blue-50 border-blue-500' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-slate-500">{ticket.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    ticket.priority === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="font-bold text-sm text-slate-900">{customers.find(c => c.id === ticket.customerId)?.name}</p>
                <p className="text-xs text-slate-600">{ticket.type}</p>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock size={12} />
                    <span>Est. 2.5h</span>
                  </div>
                  <div className="flex -space-x-2">
                    <img className="h-6 w-6 rounded-full border-2 border-white" src="https://picsum.photos/seed/tech1/40/40" alt="tech" />
                    <img className="h-6 w-6 rounded-full border-2 border-white" src="https://picsum.photos/seed/tech2/40/40" alt="tech" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl shadow-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Dispatcher Status</p>
              <p className="font-bold">Region: North East</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Active Crews</p>
              <p className="text-lg font-bold">12 / 15</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Avg Response</p>
              <p className="text-lg font-bold">42m</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-bold text-sm transition-colors">
            Emergency Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};
