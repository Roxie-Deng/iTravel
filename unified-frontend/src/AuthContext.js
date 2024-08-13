import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 修改: 添加 loading 状态
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // 修改: 使用 await 等待认证检查完成
          const response = await axios.get('http://localhost:8080/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          // 修改: 清除 token 和用户信息
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      // 修改: 设置 loading 为 false，表示认证检查完成
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      // 修改: 移除存储用户信息，仅保存 token
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', { username, email, password });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      // 修改: 移除存储用户信息，仅保存 token
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // 修改: 确保同时移除 user 信息
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    // 修改: 移除更新本地存储的用户信息
  };

  // 修改: 在 context value 中包含 loading 状态
  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
