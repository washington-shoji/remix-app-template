import { Navbar } from '../navigations/Navbar';
import { useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Sidebar } from '../navigations/Sidebar';
import { SideTopNavbar } from '../navigations/SideTopNavbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function ProtectedLayout({ children, isAuthenticated }: ProtectedLayoutProps) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <SideTopNavbar 
          isSidebarOpen={isSidebarOpen} 
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main content */}
        <main className="p-4 md:ml-64 w-full h-auto pt-20">
          {children}
        </main>
      </div>
    </div>
  );
} 