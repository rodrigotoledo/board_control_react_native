import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  HelperText
} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { parseISO } from 'date-fns';
import { darkTheme } from '@/constants/theme';
import { useUpdateProject } from '../hooks/useUpdateProject';
import {FormatDateTime} from './FormatDateTime';
const EditProject = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [users, setUsers] = useState(project.users || '');
  const [scheduledAt, setScheduledAt] = useState(
    project.scheduled_at !== null ? new Date(project.scheduled_at) : null
  );
  const [completedAt, setCompletedAt] = useState(
    project.completed_at !== null ? new Date(project.completed_at) : null
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, setterFunction) => {
    setterFunction(date);
    hideDatePicker();
  };

  const { mutate, isPending } = useUpdateProject(project.id);

  const handleSave = () => {

    mutate(
      {
        name: name,
        users: users,
        completed_at: format(completedAt, 'yyyy-MM-dd HH:mm'),
        scheduled_at: format(scheduledAt, 'yyyy-MM-dd HH:mm')
      },
    );
  };

  return (
    <View className='m-4 bg-gray-200 p-4 rounded-md'>

      {/* Project ID (non-editable) */}
      <Text>
        ID: {project.id}
      </Text>

      {/* Name Input */}
      <TextInput
        label="Name"
        value={name}
        onChangeText={name => setName(name)}
        mode="outlined"
        theme={{ colors: { text: darkTheme.colors.onSurface } }}
      />

      {/* Users Input */}
      <TextInput
        label="Users (comma-separated)"
        value={users}
        onChangeText={(users) => setUsers(users)}
        mode="outlined"
        theme={{ colors: { text: darkTheme.colors.onSurface } }}
      />
      <HelperText type="info" style={{ color: darkTheme.colors.primary }}>
        Separate names with commas (e.g., "John, Jane")
      </HelperText>
      <View className='mb-4'>
        <Text className='font-bold text-2xl'>{FormatDateTime(completedAt)}</Text>
        <Button onPress={() => showDatePicker()} uppercase={false} mode="outlined" icon='calendar'>
          Change Completed Date
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={completedAt}
          onConfirm={(date) => handleConfirm(date, setCompletedAt)}
          onCancel={hideDatePicker}
        />
      </View>
      <View className='mb-4'>

        <Button onPress={() => showDatePicker()} uppercase={false} mode="outlined" icon='calendar'>
          <Text>Change Scheduled Date</Text>
          <Text className='font-bold text-sm'>{scheduledAt && FormatDateTime(scheduledAt)}</Text>
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={scheduledAt}
          onConfirm={(date) => handleConfirm(date, setScheduledAt)}
          onCancel={hideDatePicker}
        />
      </View>
      {isPending &&(
        <ActivityIndicator size='large' />
      )}

      <Button
        icon='folder-check-outline'
        onPress={handleSave}
        buttonColor={darkTheme.colors.primary}
        textColor={darkTheme.colors.onPrimary}
      >
        Save
      </Button>
    </View>
  );
};

export default EditProject;
