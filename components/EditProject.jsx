import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  HelperText
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { parseISO } from 'date-fns';
import { darkTheme } from '@/constants/theme';
import { useUpdateProject } from '../hooks/useUpdateProject';

const EditProject = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [users, setUsers] = useState(project.users || '');
  const [completedAt, setCompletedAt] = useState(
    project.completed_at ? new Date(project.completed_at) : null
  );
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateProject(project.id);

  const handleSave = () => {

    mutate(
      {
        name: name,
        users: users,
        completed_at: format(completedAt, 'yyyy-MM-dd HH:mm')
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
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Fill with Completed Date
        </Button>
        <DatePicker
          modal
          date={completedAt || new Date()}
          onDateChange={setCompletedAt}
          open={open}
          onConfirm={(date) => {
            setOpen(false)
            setCompletedAt(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
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
