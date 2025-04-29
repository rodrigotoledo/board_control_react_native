import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from '@/constants/theme';

export default function UnauthenticatedLayout() {
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={lightTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1F2937',
          tabBarInactiveTintColor: '#374151',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Sign In',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'log-in' : 'log-in-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="sign_up"
          options={{
            title: 'Create Account',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person-add' : 'person-add-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
