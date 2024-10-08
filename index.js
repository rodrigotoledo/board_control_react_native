/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();
axios.defaults.baseURL = 'https://fa4d-45-71-76-107.ngrok-free.app/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.interceptors.request.use(
  async config => {
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    console.log('Error interceptors:', error);
    return Promise.reject(error);
  },
);

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
