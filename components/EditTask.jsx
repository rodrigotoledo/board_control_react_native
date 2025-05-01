import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import DateTimePickerField from '../components/DateTimePickerField'
import { format } from 'date-fns';
import { darkTheme } from '@/constants/theme';
import { useUpdateTask } from '../hooks/useUpdateTask';

const EditTask = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [completedAt, setCompletedAt] = useState(
    task.completed_at ? new Date(task.completed_at) : null
  );
  const { mutate, isPending } = useUpdateTask(task.id);

  const handleSave = () => {

    mutate(
      {
        title: title,
        completed_at: format(completedAt, 'yyyy-MM-dd HH:mm')
      },
    );
  };

  return (
    <View className='m-4 bg-gray-200 p-4 rounded-md'>

      <Text>
        ID: {task.id}
      </Text>

      <TextInput
        label="Title"
        value={title}
        onChangeText={title => setTitle(title)}
        mode="outlined"
        theme={{ colors: { text: darkTheme.colors.onSurface } }}
      />

      <View className='mb-4'>
        <DateTimePickerField
          value={completedAt}
          onChange={setCompletedAt}
        />
      </View>
      {isPending &&(
        <ActivityIndicator size='large' />
      )}

      <Button
        icon='bookmark-outline'
        onPress={handleSave}
        buttonColor={darkTheme.colors.primary}
        textColor={darkTheme.colors.onPrimary}
      >
        Save
      </Button>
    </View>
  );
};

export default EditTask;
