import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  auth: { isLoggedIn: false, user: null},
  login: () => {},
  logout: () => {}
}

);

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({
    isLoggedIn: !!localStorage.getItem('token'), // Check if token exists in localStorage
    user: JSON.parse(localStorage.getItem('user')), // 从 localStorage 中恢复用户信息
  });
  console.log("AuthProvider auth state:", auth); 

  const login = (user) => {
    setAuth({ isLoggedIn: true, user});
    localStorage.setItem('token', user.token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log("Login successful:", user);
  };

  const logout = (navigate) => {
    setAuth({ isLoggedIn: false, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("Logged out");
    if (navigate) {
      navigate('/'); // 重定向到首页
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);