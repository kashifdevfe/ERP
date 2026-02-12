
import { Branch, Customer, Ticket, Equipment, Employee, Invoice, InventoryItem } from './types';

const STATES = ['NY', 'CT', 'NJ', 'PA', 'MA', 'IL', 'VA', 'MD', 'CO', 'GA'];
const NAMES = ['John Doe', 'Jane Smith', 'Robert Brown', 'Emily Davis', 'Michael Wilson', 'Sarah Miller', 'David Garcia', 'Linda Martinez'];

export const generateMockData = () => {
  const branches: Branch[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `BR-${i + 1}`,
    name: `SavATree ${STATES[i % STATES.length]} Branch`,
    state: STATES[i % STATES.length],
    manager: NAMES[i % NAMES.length],
    employees: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 500000) + 100000,
    healthScore: Math.floor(Math.random() * 40) + 60,
    status: i < 7 ? 'Integrated' : i < 9 ? 'Migrating' : 'Pending',
  }));

  const customers: Customer[] = Array.from({ length: 200 }).map((_, i) => ({
    id: `CUST-${i + 1}`,
    name: `Client ${i + 1}`,
    email: `client${i + 1}@example.com`,
    phone: `555-010${i}`,
    address: `${Math.floor(Math.random() * 9999)} Main St, ${STATES[i % STATES.length]}`,
    lat: 40.7128 + (Math.random() - 0.5) * 5,
    lng: -74.0060 + (Math.random() - 0.5) * 5,
    riskScore: Math.floor(Math.random() * 100),
    ltv: Math.floor(Math.random() * 50000),
    contracts: ['Annual Care', 'Winter Pruning'],
    status: Math.random() > 0.1 ? 'Active' : 'Lead',
  }));

  const employees: Employee[] = Array.from({ length: 80 }).map((_, i) => ({
    id: `EMP-${i + 1}`,
    name: NAMES[i % NAMES.length],
    role: ['Arborist', 'Technician', 'Dispatcher', 'Manager'][Math.floor(Math.random() * 4)] as any,
    branchId: branches[Math.floor(Math.random() * branches.length)].id,
    certification: ['ISA Certified', 'TCIA Accredited'],
    utilization: Math.floor(Math.random() * 40) + 50,
    performance: Math.floor(Math.random() * 20) + 80,
  }));

  const tickets: Ticket[] = Array.from({ length: 150 }).map((_, i) => ({
    id: `WO-${i + 1}`,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    type: ['Tree Removal', 'Pruning', 'Pest Control', 'Lawn Care', 'Emergency'][Math.floor(Math.random() * 5)] as any,
    status: ['Scheduled', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)] as any,
    priority: ['Low', 'Medium', 'High', 'Emergency'][Math.floor(Math.random() * 4)] as any,
    assignedTo: employees[Math.floor(Math.random() * employees.length)].id,
    date: new Date(Date.now() - Math.random() * 1000000000).toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 5000) + 500,
  }));

  const equipment: Equipment[] = Array.from({ length: 40 }).map((_, i) => ({
    id: `EQ-${i + 1}`,
    name: `Unit ${i + 101}`,
    type: ['Truck', 'Chiper', 'Crane', 'Stump Grinder'][Math.floor(Math.random() * 4)] as any,
    hours: Math.floor(Math.random() * 5000),
    nextMaintenance: Math.floor(Math.random() * 1000) + 100,
    status: Math.random() > 0.8 ? 'Maintenance' : 'Active',
    utilization: Math.floor(Math.random() * 60) + 30,
  }));

  const invoices: Invoice[] = Array.from({ length: 500 }).map((_, i) => ({
    id: `INV-${i + 1000}`,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    amount: Math.floor(Math.random() * 2000) + 100,
    date: new Date(Date.now() - Math.random() * 5000000000).toISOString().split('T')[0],
    status: Math.random() > 0.2 ? 'Paid' : Math.random() > 0.5 ? 'Unpaid' : 'Overdue',
  }));

  const inventory: InventoryItem[] = [
    { id: 'INV-1', name: '7-0-7 Fertilizer', category: 'Fertilizer', stock: 450, minStock: 100, unit: 'bags', price: 45 },
    { id: 'INV-2', name: 'Permethrin Solution', category: 'Chemical', stock: 12, minStock: 20, unit: 'gallons', price: 120 },
    { id: 'INV-3', name: 'Chainsaw Chain 18"', category: 'Part', stock: 55, minStock: 10, unit: 'units', price: 25 },
    { id: 'INV-4', name: 'Growth Regulator', category: 'Chemical', stock: 8, minStock: 5, unit: 'gallons', price: 450 },
  ];

  return { branches, customers, tickets, equipment, employees, invoices, inventory };
};
