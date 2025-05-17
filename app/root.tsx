import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

import { PublicLayout } from './components/layouts/PublicLayout';
import { ProtectedLayout } from './components/layouts/ProtectedLayout';
import { AuthProvider } from './utils/auth.context';
import { getUserId } from './utils/session.server';

import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// Add your protected routes here
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings'];

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  
  return json({
    isAuthenticated: !!userId,
    user: userId ? {
      id: userId,
      email: 'user@example.com', // This would come from your database in a real app
      name: 'Test User'
    } : null
  });
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const { isAuthenticated, user } = useLoaderData<typeof loader>();
  
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <Document>
      <AuthProvider initialState={{ isAuthenticated, user }}>
        {isProtectedRoute ? (
          <ProtectedLayout isAuthenticated={isAuthenticated}>
            <Outlet />
          </ProtectedLayout>
        ) : (
          <PublicLayout>
            <Outlet />
          </PublicLayout>
        )}
      </AuthProvider>
    </Document>
  );
}
