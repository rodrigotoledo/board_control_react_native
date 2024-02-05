/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tasks from './components/Tasks';
import Projects from './components/Projects';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import {TaskProvider} from './components/context/TaskContext';
import {ProjectProvider} from './components/context/ProjectContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

const AuthenticatedTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#334155', // Define a cor de fundo do tabBar
        },
        tabBarActiveTintColor: 'white', // Cor do texto e ícone quando ativo
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarLabel: 'Projects',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="alpha-p-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#334155', // Define a cor de fundo do tabBar
        },
        tabBarActiveTintColor: 'white', // Cor do texto e ícone quando ativo
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarLabel: 'SignIn',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          tabBarLabel: 'SignUp',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-star"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App(): React {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Verifique se há algo no AsyncStorage que indica autenticação
    const checkAuthentication = async () => {
      try {
        const value = await AsyncStorage.getItem('authToken'); // Substitua 'authToken' pelo nome da sua chave de autenticação
        if (value !== null) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      }
    };

    checkAuthentication();
  }, []);
  return (
    <TaskProvider>
      <ProjectProvider>
        <NavigationContainer>
          {isAuthenticated ? <AuthenticatedTabs /> : <Tabs />}
        </NavigationContainer>
      </ProjectProvider>
    </TaskProvider>
  );
}

export default App;
