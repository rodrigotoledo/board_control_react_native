/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import {TaskProvider} from './components/context/TaskContext';
import {ProjectProvider} from './components/context/ProjectContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#334155', // Define a cor de fundo do tabBar
        },
        tabBarActiveTintColor: 'white', // Cor do texto e ícone quando ativo
        tabBarInactiveTintColor: 'gray'
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

function App(): React {
  return (
    <TaskProvider>
      <ProjectProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ProjectProvider>
    </TaskProvider>
  );
}

export default App;
