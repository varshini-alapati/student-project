import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const Layout: React.FC = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Outlet />;
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setShowMobileSidebar(false)}
          />
          <Sidebar mobile onClose={() => setShowMobileSidebar(false)} />
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setShowMobileSidebar(true)} />
        
        <main className="flex-1 overflow-y-auto pt-16 pb-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;