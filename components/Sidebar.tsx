
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  Wrench, 
  ClipboardList, 
  Package, 
  Truck, 
  UsersRound, 
  DollarSign, 
  ShieldCheck, 
  Settings,
  CloudLightning,
  Smartphone,
  BarChart3,
  Rocket
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/onboarding', icon: Rocket, label: 'M&A Onboarding' },
  { path: '/customers', icon: Users, label: 'CRM' },
  { path: '/sales', icon: DollarSign, label: 'Sales & Quoting' },
  { path: '/dispatch', icon: Map, label: 'Dispatch' },
  { path: '/work-orders', icon: ClipboardList, label: 'Work Orders' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/equipment', icon: Truck, label: 'Equipment' },
  { path: '/hr', icon: UsersRound, label: 'HR' },
  { path: '/finance', icon: BarChart3, label: 'Finance' },
  { path: '/compliance', icon: ShieldCheck, label: 'Compliance' },
  { path: '/mobile', icon: Smartphone, label: 'Field App' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <div className="bg-emerald-500 p-2 rounded-lg">
          <CloudLightning size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">SavATree <span className="text-emerald-400 font-normal">ERP</span></span>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <p className="text-slate-500 text-xs font-semibold uppercase mb-4 px-2">Menu</p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">System Health</p>
          <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
          </div>
          <p className="text-[10px] text-emerald-400 mt-2">All systems operational</p>
        </div>
      </div>
    </aside>
  );
};
