import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import BrowseCleaners from '@/pages/BrowseCleaners';
import CleanerProfile from '@/pages/CleanerProfile';
import CustomerDashboard from '@/pages/CustomerDashboard';
import ProviderDashboard from '@/pages/ProviderDashboard';
import PricingPage from '@/pages/PricingPage';
import AuthPage from '@/pages/AuthPage';
import MessagingPage from '@/pages/MessagingPage';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/browse" element={<BrowseCleaners />} />
            <Route path="/cleaner/:id" element={<CleanerProfile />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/messages" element={<MessagingPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;