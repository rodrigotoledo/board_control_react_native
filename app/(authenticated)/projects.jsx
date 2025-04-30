import React, { useState, useCallback, useEffect } from 'react';
import { Alert, View, FlatList, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme, Text, TouchableRipple, Surface } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { darkTheme } from '@/constants/theme';
import { monthlyProjects } from '../../hooks/monthlyProjects';
import EditProject from '../../components/EditProject';

const ProjectsScreen = () => {
  const params = useLocalSearchParams();


  const [selectedDate, setSelectedDate] = useState(
    params?.completed_at || new Date().toISOString().split('T')[0]
  );

  const { data: projects, isLoading, isError, refetch } = monthlyProjects(selectedDate);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    refetch();
  };

  useEffect(() => {
    console.tron.log(projects)
  },[true])

  const processSelectedProjects = () => {
    const markedDates = {};

    projects.forEach(project => {
      if (!project.completed_at) return;

      const dateStr = project.completed_at.split('T')[0];

      if (!markedDates[dateStr]) {
        markedDates[dateStr] = {
          selected: true,
          marked: true,
          selectedColor: 'gray',
          projects: [project]
        };
      } else {
        markedDates[dateStr].projects.push(project);
      }
    });

    return markedDates;
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading projects...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error loading projects</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className='flex space-y-2'>
      <Calendar
        style={{
          borderWidth: 2,
          borderColor: 'gray',
          height: 350
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d1d5db'
        }}
        current={selectedDate}
        onDayPress={day => handleDayPress(day)}
        markedDates={processSelectedProjects()}
      />
      {projects.length > 0 ? (
        <FlatList
          data={projects}
          renderItem={({ item }) => <EditProject project={item} />}
          keyExtractor={(item) => item.id}

        />
      ) : (
        <Text className='text-xl font-bold'>No projects for this date</Text>
      )}
    </SafeAreaView>
  );
};

export default ProjectsScreen;
