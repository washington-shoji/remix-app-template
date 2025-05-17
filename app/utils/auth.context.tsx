import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    email: string;
    name?: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ 
  children,
  initialState
}: { 
  children: ReactNode;
  initialState: AuthContextType;
}) {
  return (
    <AuthContext.Provider value={initialState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 