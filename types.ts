
export type Status = 'Active' | 'Inactive' | 'Pending' | 'Warning' | 'Critical';

export interface Branch {
  id: string;
  name: string;
  state: string;
  manager: string;
  employees: number;
  revenue: number;
  healthScore: number;
  status: 'Integrated' | 'Migrating' | 'Pending';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  lat: number;
  lng: number;
  riskScore: number;
  ltv: number;
  contracts: string[];
  status: 'Lead' | 'Active' | 'Churned';
}

export interface Ticket {
  id: string;
  customerId: string;
  type: 'Tree Removal' | 'Pruning' | 'Pest Control' | 'Lawn Care' | 'Emergency';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'SLA Breach';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  assignedTo: string; // Employee ID
  date: string;
  revenue: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'Truck' | 'Chiper' | 'Crane' | 'Stump Grinder';
  hours: number;
  nextMaintenance: number;
  status: 'Active' | 'Maintenance' | 'Down';
  utilization: number;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Arborist' | 'Technician' | 'Dispatcher' | 'Manager';
  branchId: string;
  certification: string[];
  utilization: number;
  performance: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Chemical' | 'Fertilizer' | 'Part' | 'Tool';
  stock: number;
  minStock: number;
  unit: string;
  price: number;
}
