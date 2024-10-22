import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthState = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role'); // Get the role from localStorage
      setIsAuthenticated(!!token);
      setIsAdmin(role === 'admin'); // Set isAdmin based on the role
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const login = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Store the role in localStorage
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
  };

 const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove the role from localStorage
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
