
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateMockData } from './mockData';
import { Branch, Customer, Ticket, Equipment, Employee, Invoice, InventoryItem } from './types';

interface ERPState {
  branches: Branch[];
  customers: Customer[];
  tickets: Ticket[];
  equipment: Equipment[];
  employees: Employee[];
  invoices: Invoice[];
  inventory: InventoryItem[];
  stormMode: boolean;
  activeBranchId: string | null;
  role: 'Admin' | 'Dispatcher' | 'Arborist';
  
  // Actions
  toggleStormMode: () => void;
  setRole: (role: 'Admin' | 'Dispatcher' | 'Arborist') => void;
  setActiveBranch: (id: string | null) => void;
  addCustomer: (cust: Customer) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  addBranch: (branch: Branch) => void;
}

const mock = generateMockData();

export const useERPStore = create<ERPState>()(
  persist(
    (set) => ({
      ...mock,
      stormMode: false,
      activeBranchId: null,
      role: 'Admin',

      toggleStormMode: () => set((state) => ({ stormMode: !state.stormMode })),
      setRole: (role) => set({ role }),
      setActiveBranch: (id) => set({ activeBranchId: id }),
      addCustomer: (cust) => set((state) => ({ customers: [cust, ...state.customers] })),
      updateTicket: (id, updates) => set((state) => ({
        tickets: state.tickets.map(t => t.id === id ? { ...t, ...updates } : t)
      })),
      addBranch: (branch) => set((state) => ({ branches: [...state.branches, branch] })),
    }),
    { name: 'savatree-erp-storage' }
  )
);
