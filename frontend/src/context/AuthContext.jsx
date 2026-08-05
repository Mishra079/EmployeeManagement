import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ems_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email, password) => {
    if (email === 'admin@ems.com' && password === 'admin123') {
      const userData = { email, role: 'ADMIN', name: 'System Admin' };
      localStorage.setItem('ems_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ems_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
