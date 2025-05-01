if (__DEV__) {
  require("../ReactotronConfig");
}
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Slot, SplashScreen, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const AuthLayout = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setHasToken(!!token);
      } catch (error) {
        console.error('Auth check error:', error);
        setHasToken(false);
      } finally {
        setAuthChecked(true);
        SplashScreen.hideAsync();
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authChecked && hasToken) {
      const today = new Date().toISOString().split('T')[0];
      router.replace(`(authenticated)/projects?completed_at=${today}`);
    }
  }, [authChecked, hasToken]);

  if (!authChecked) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
};

export default AuthLayout;
