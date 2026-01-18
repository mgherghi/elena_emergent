import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    const savedCredits = localStorage.getItem('credits');
    const savedSubscription = localStorage.getItem('subscription');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCredits) {
      setCredits(parseInt(savedCredits));
    }
    if (savedSubscription) {
      setSubscription(JSON.parse(savedSubscription));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setCredits(0);
    setSubscription(null);
    localStorage.removeItem('user');
    localStorage.removeItem('credits');
    localStorage.removeItem('subscription');
  };

  const addCredits = (amount) => {
    const newCredits = credits + amount;
    setCredits(newCredits);
    localStorage.setItem('credits', newCredits.toString());
  };

  const spendCredits = (amount) => {
    if (credits >= amount) {
      const newCredits = credits - amount;
      setCredits(newCredits);
      localStorage.setItem('credits', newCredits.toString());
      return true;
    }
    return false;
  };

  const subscribe = (plan) => {
    setSubscription(plan);
    localStorage.setItem('subscription', JSON.stringify(plan));
  };

  const value = {
    user,
    credits,
    subscription,
    loading,
    login,
    logout,
    addCredits,
    spendCredits,
    subscribe,
    isAuthenticated: !!user,
    hasSubscription: !!subscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};