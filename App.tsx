import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tasks from './components/Tasks';
import Projects from './components/Projects';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Logout from './components/Logout';

import {TaskProvider} from './components/context/TaskContext';
import {ProjectProvider} from './components/context/ProjectContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthenticatedTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#334155',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
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
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="alpha-p-box"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SignInSignUpStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{headerShown: false}}
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUp}
      />
      <Stack.Screen
        name="AuthenticatedTabs"
        options={{headerShown: false}}
        component={AuthenticatedTabs}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedTabsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthenticatedTabs"
        component={AuthenticatedTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const value = await AsyncStorage.getItem('authToken');
        setIsAuthenticated(value !== null);
      } catch (error) {
        console.log('Error:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <TaskProvider>
      <ProjectProvider>
        <NavigationContainer>
          {isAuthenticated ? <AuthenticatedTabsStack /> : <SignInSignUpStack />}
        </NavigationContainer>
      </ProjectProvider>
    </TaskProvider>
  );
};

export default App;
