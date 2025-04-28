if (__DEV__) {
  require("../ReactotronConfig");
}
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Slot, SplashScreen } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../global.css'

SplashScreen.preventAutoHideAsync();

const AuthLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        setIsAuthenticated(!!authToken);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
};

export default AuthLayout;
