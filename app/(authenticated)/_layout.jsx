import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeaderLeftWithTitle from '@/components/HeaderLeftWithTitle';
import SignOutButton from '@/components/SignOutButton';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from '@/constants/theme';


export default function AuthenticatedLayout() {
  const router = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FF4081',
          tabBarInactiveTintColor: '#8E44AD',
          headerTitle: '',
          headerLeft: () => <HeaderLeftWithTitle />,
          headerRight: () => <SignOutButton />
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="tiktik"
          options={{
            title: '*TikTik*',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
