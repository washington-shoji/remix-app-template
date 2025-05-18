import { Navbar } from '../navigations/Navbar';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Your App Name</p>
      </footer>
    </div>
  );
} 