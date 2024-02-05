/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient()

import Config from "react-native-config";
// debugger
console.log(Config.REACT_APP_API_HTTP_ADDRESS)
axios.defaults.baseURL = 'https://0277-45-71-76-107.ngrok-free.app';

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
