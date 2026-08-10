import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        return true;
      }

      /* Fallback demo login for development */
      if (email === 'admin@deesontech.com' && password === 'admin123') {
        const demoUser = { email, role: 'admin' };
        localStorage.setItem('admin_token', 'demo-token');
        localStorage.setItem('admin_user', JSON.stringify(demoUser));
        setIsAuthenticated(true);
        setUser(demoUser);
        return true;
      }

      return false;
    } catch {
      /* API not available – use demo credentials */
      if (email === 'admin@deesontech.com' && password === 'admin123') {
        const demoUser = { email, role: 'admin' };
        localStorage.setItem('admin_token', 'demo-token');
        localStorage.setItem('admin_user', JSON.stringify(demoUser));
        setIsAuthenticated(true);
        setUser(demoUser);
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
