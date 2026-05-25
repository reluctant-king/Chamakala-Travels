import React, { createContext, useState, useEffect } from 'react';

// Context to share auth state (admin token) across the app
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem('adminInfo');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage in sync when auth changes
  useEffect(() => {
    if (auth) {
      localStorage.setItem('adminInfo', JSON.stringify(auth));
    } else {
      localStorage.removeItem('adminInfo');
    }
  }, [auth]);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('adminInfo');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
