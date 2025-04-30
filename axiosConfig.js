// src/axiosConfig.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = 'https://c60b-2804-4308-578-e00-d505-9413-eced-21d.ngrok-free.app';
axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
