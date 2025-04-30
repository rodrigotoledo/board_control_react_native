import React, { useState, useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useTheme, Text, TouchableRipple, Surface } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { darkTheme } from '@/constants/theme';
import { monthlyProjects } from '../../hooks/monthlyProjects';
import EditProjectModal from '../../components/EditProjectModal';

const ProjectsScreen = () => {
  const params = useLocalSearchParams();

  const getAgendaTheme = () => ({
    backgroundColor: darkTheme.colors.primary,
    calendarBackground: darkTheme.colors.primary,
    textSectionTitleColor: darkTheme.colors.onSurfaceVariant,
    selectedDayBackgroundColor: darkTheme.colors.point,
    selectedDayTextColor: darkTheme.colors.onPrimaryContainer,
    todayTextColor: darkTheme.colors.onPrimary,
    dayTextColor: darkTheme.colors.onSurface,
    textDisabledColor: darkTheme.colors.onSurfaceDisabled,
    dotColor: darkTheme.colors.point,
    selectedDotColor: darkTheme.colors.onPrimary,
    arrowColor: darkTheme.colors.point,
    monthTextColor: darkTheme.colors.point,
    indicatorColor: darkTheme.colors.point,

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

  const [selectedDate, setSelectedDate] = useState(
    params?.completed_at || new Date().toISOString().split('T')[0]
  );

  const { data: projects, isLoading, isError, refetch } = monthlyProjects(selectedDate);
  const [items, setItems] = useState({});

  useEffect(() => {

    if (projects) {
      const processedItems = processProjects(projects);
      if (!processedItems[selectedDate]) {
        processedItems[selectedDate] = [];
      }
      setItems(processedItems);
    }
    setAgendaTheme(getAgendaTheme());
  }, [projects]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Atualiza a data selecionada
    refetch(); // Opcional: Força uma nova chamada à API (depende da sua implementação)
  };

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
      <EditProjectModal project={project} />
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
      selected={selectedDate}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      theme={agendaTheme}
      onDayPress={handleDayPress}
      key={'dark'}
    />
  );
};

export default ProjectsScreen;
