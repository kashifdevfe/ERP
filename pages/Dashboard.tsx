
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
// Added CloudLightning to imports
import { TrendingUp, Users, ClipboardList, AlertTriangle, Building2, UserCheck, CloudLightning } from 'lucide-react';
import { useERPStore } from '../store';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export const Dashboard = () => {
  const { tickets, branches, equipment, employees } = useERPStore();

  const kpis = [
    { label: 'Revenue Today', value: '$128,450', trend: '+12%', icon: TrendingUp, color: 'emerald' },
    { label: 'Open Tickets', value: tickets.filter(t => t.status !== 'Completed').length, trend: '-2', icon: ClipboardList, color: 'blue' },
    { label: 'Emergency Jobs', value: tickets.filter(t => t.priority === 'Emergency').length, trend: '+5', icon: AlertTriangle, color: 'red' },
    { label: 'Utilization %', value: '88.4%', trend: '+3.1%', icon: UserCheck, color: 'amber' },
  ];

  const chartData = [
    { name: 'Mon', rev: 4000, jobs: 24 },
    { name: 'Tue', rev: 3000, jobs: 18 },
    { name: 'Wed', rev: 5000, jobs: 29 },
    { name: 'Thu', rev: 4500, jobs: 22 },
    { name: 'Fri', rev: 6000, jobs: 35 },
    { name: 'Sat', rev: 3500, jobs: 15 },
    { name: 'Sun', rev: 2000, jobs: 8 },
  ];

  const pieData = [
    { name: 'Removal', value: 400 },
    { name: 'Pruning', value: 300 },
    { name: 'Pest', value: 300 },
    { name: 'Lawn', value: 200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Overview</h1>
          <p className="text-slate-500">Real-time enterprise performance metrics across all states.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Generate Report</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-sm">Add Branch</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-${kpi.color}-50 text-${kpi.color}-600`}>
                <kpi.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Weekly Revenue Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="rev" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Service Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-xs text-slate-500">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Branch Performance Score</h3>
            <button className="text-emerald-600 text-sm font-bold">View Leaderboard</button>
          </div>
          <div className="space-y-4">
            {branches.slice(0, 5).map((branch) => (
              <div key={branch.id} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{branch.name}</span>
                  <span className="text-emerald-600">{branch.healthScore}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${branch.healthScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Critical Alerts</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-50 border border-red-100 rounded-xl">
              <AlertTriangle className="text-red-600 shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-red-900">Equipment Failure: Unit 105 (Crane)</p>
                <p className="text-xs text-red-700 mt-1">Hydraulic leak detected in NY-Central branch. Immediate maintenance required.</p>
                <button className="mt-2 text-xs font-bold text-red-800 bg-red-200/50 px-2 py-1 rounded">Create Repair Order</button>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <CloudLightning className="text-amber-600 shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-amber-900">Severe Weather Watch: CT Region</p>
                <p className="text-xs text-amber-700 mt-1">High winds expected. Dispatchers advised to monitor emergency queue.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
