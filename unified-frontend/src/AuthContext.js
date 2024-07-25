import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  auth: { isLoggedIn: false, user: null },
  login: () => {},
  logout: () => {}
}

);

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem('user')) // 从 localStorage 中恢复用户信息
  });
  console.log("AuthProvider auth state:", auth); 

  const login = (user) => {
    setAuth({ isLoggedIn: true, user });
    localStorage.setItem('token', user.token);
    console.log("Login successful:", user);
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
    localStorage.removeItem('token');
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);