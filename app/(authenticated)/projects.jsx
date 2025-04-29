import React, { useState, useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useTheme, Text, TouchableRipple, Surface } from 'react-native-paper';
import { monthlyProjects } from '../hooks/monthlyProjects';
import { useLocalSearchParams } from 'expo-router';
import { darkTheme } from '@/constants/theme';

const ProjectsScreen = () => {
  const params = useLocalSearchParams();

  const getAgendaTheme = () => ({
    backgroundColor: darkTheme.colors.primary,
    calendarBackground: darkTheme.colors.primary,
    textSectionTitleColor: darkTheme.colors.onSurfaceVariant,
    selectedDayBackgroundColor: darkTheme.colors.onSurfaceVariant,
    selectedDayTextColor: darkTheme.colors.onPrimary,
    todayTextColor: darkTheme.colors.primary,
    dayTextColor: darkTheme.colors.onSurface,
    textDisabledColor: darkTheme.colors.onSurfaceDisabled,
    dotColor: darkTheme.colors.primary,
    selectedDotColor: darkTheme.colors.onPrimary,
    arrowColor: darkTheme.colors.primary,
    monthTextColor: darkTheme.colors.primary,
    indicatorColor: darkTheme.colors.primary,

    // Estilos da agenda
    agendaKnobColor: darkTheme.colors.surfaceVariant,
    agendaDayTextColor: darkTheme.colors.primary,
    agendaDayNumColor: darkTheme.colors.onSurface,
    agendaTodayColor: darkTheme.colors.primary,

    // Fundo da lista de itens
    agendaBackgroundColor: darkTheme.dark ? '#F7FAFC' : '#F7FAFC',

    // Estilos do cabeçalho do dia
    agendaDayTextColor: darkTheme.colors.primary,
    agendaDayNumColor: darkTheme.colors.onSurface,
    agendaTodayColor: darkTheme.colors.primary,

    // Estilos dos itens
    reservationBackgroundColor: darkTheme.dark ? '#EDF2F7' : '#EDF2F7',
  });

  // // Dentro do seu componente
  const [agendaTheme, setAgendaTheme] = useState(getAgendaTheme());

  const initialDate = params?.completed_at || new Date().toISOString().split('T')[0];

  const { data: projects, isLoading, isError } = monthlyProjects(initialDate);
  const [items, setItems] = useState({});

  useEffect(() => {

    if (projects) {
      const processedItems = processProjects(projects);
      if (!processedItems[initialDate]) {
        processedItems[initialDate] = [];
      }
      console.log(processedItems)
      setItems(processedItems);
    }
    setAgendaTheme(getAgendaTheme());
  }, [projects]);

  const processProjects = (projects) => {
    const agendaItems = {};

    projects.forEach(project => {
      if (!project.completed_at) return;

      const dateStr = project.completed_at.split('T')[0];
      if (!agendaItems[dateStr]) {
        agendaItems[dateStr] = [];
      }

      agendaItems[dateStr].push({
        name: project.name,
        height: 80,
        day: dateStr,
        id: project.id,
        users: project.users
      });
    });

    return agendaItems;
  };

  const renderItem = useCallback((project, isFirst) => {
    return (
      <TouchableRipple
        onPress={() => Alert.alert(
          project.name,
          `Users: ${project.users?.join(', ')}\nID: ${project.id}`
        )}
        className="my-2 mx-1 rounded-lg"
      >
        <Surface className="p-4 rounded-lg" elevation={2}>
          <Text className="text-base font-bold p-2 rounded-sm" style={{ color: darkTheme.colors.onSurface }}>
            {project.name}
          </Text>
          {project.users && (
            <Text className="text-xs text-gray-500 mt-1">
              {project.users.join(', ')}
            </Text>
          )}
        </Surface>
      </TouchableRipple>
    );
  }, []);

  const renderEmptyDate = useCallback(() => {
    return (
      <View className="p-4 items-center justify-center">
        <Text style={{ color: darkTheme.colors.onSurfaceVariant }}>
          No projects on this date
        </Text>
      </View>
    );
  }, []);

  const rowHasChanged = useCallback((r1, r2) => r1.name !== r2.name, []);

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
    <Agenda
      items={items}
      selected={initialDate}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      theme={agendaTheme}
      key={'dark'}
    />
  );
};

export default ProjectsScreen;
