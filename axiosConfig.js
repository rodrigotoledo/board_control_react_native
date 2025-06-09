// src/axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = 'https://eabd-45-70-34-105.ngrok-free.app';
axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
