import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar token ao carregar
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (token) => {
    await AsyncStorage.setItem('authToken', token);
    setUser({ token });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);