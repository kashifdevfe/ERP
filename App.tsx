
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Dispatch } from './pages/Dispatch';
import { WorkOrders } from './pages/WorkOrders';

// Lazy load new modules
const CRM = lazy(() => import('./pages/CRM'));
const Sales = lazy(() => import('./pages/Sales'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Equipment = lazy(() => import('./pages/Equipment'));
const HR = lazy(() => import('./pages/HR'));
const Finance = lazy(() => import('./pages/Finance'));
const Compliance = lazy(() => import('./pages/Compliance'));
const FieldMobile = lazy(() => import('./pages/FieldMobile'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <div className="p-8">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/customers" element={<CRM />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/dispatch" element={<Dispatch />} />
                <Route path="/work-orders" element={<WorkOrders />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/hr" element={<HR />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/mobile" element={<FieldMobile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
