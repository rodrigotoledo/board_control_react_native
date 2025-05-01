import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from '@/constants/theme';
import HeaderLeftWithTitle from '@/components/HeaderLeftWithTitle';
import SignOutButton from '@/components/SignOutButton';

import { TaskProvider } from '../../context/TaskContext';
import { ProjectProvider } from '../../context/ProjectContext';


export default function AuthenticatedLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} >
          <TaskProvider>
            <ProjectProvider>
              <PaperProvider theme={lightTheme}>
                <Tabs
                  screenOptions={{
                    tabBarActiveTintColor: '#1f2937',
                    tabBarInactiveTintColor: '#9ca3af',
                    headerTitle: '',
                    headerLeft: () => <HeaderLeftWithTitle />,
                    headerRight: () => <SignOutButton />
                  }}
                >
                  <Tabs.Screen
                    name="projects"
                    options={{
                      title: '*Projects*',
                      tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'folder' : 'folder-outline'} color={color} size={24} />
                      ),
                    }}
                  />
                  <Tabs.Screen
                    name="tasks"
                    options={{
                      title: '*Tasks*',
                      tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} color={color} size={24} />
                      ),
                    }}
                  />
                </Tabs>
              </PaperProvider>
            </ProjectProvider>
          </TaskProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
