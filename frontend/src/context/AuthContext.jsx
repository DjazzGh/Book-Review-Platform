
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token with backend
      setUser({ token }); // Simplified; you can decode JWT or fetch user data
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ token: response.data.token });
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axiosInstance.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ token: response.data.token });
      return true;
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
