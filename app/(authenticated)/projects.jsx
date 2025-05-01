import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { monthlyProjects } from '../../hooks/monthlyProjects';
import EditProject from '../../components/EditProject';
import { FormatDate } from '../../components/FormatDateTime'

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
        <Text className='font-bold text-gray-400'>Loading projects...</Text>
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
    <View className='flex-1 items-center justify-start bg-white px-4'>
      <View className='w-full max-w-md'>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 8,
            height: 350,
            width: '100%',
            marginVertical: 16,
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#6b7280',
            selectedDayBackgroundColor: '#3b82f6',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#3b82f6',
            dayTextColor: '#1f2937',
            textDisabledColor: '#d1d5db',
            'stylesheet.calendar.main': {
              container: {
                padding: 0,
              },
            },
          }}
          current={selectedDate}
          onDayPress={handleDayPress}
          markedDates={processSelectedProjects()}
        />
      </View>

      {projects.length > 0 ? (
        <FlatList
          className='w-full mt-4'
          data={projects}
          renderItem={({ item }) => <EditProject project={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className='w-full items-center justify-center py-8'>
          <Text className='font-bold text-gray-400 text-xl'>
            No projects for this date <Text className='font-bold underline text-2xl'>{FormatDate(selectedDate)}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProjectsScreen;
