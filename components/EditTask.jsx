import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { parseISO } from 'date-fns';
import { darkTheme } from '@/constants/theme';
import { useUpdateTask } from '../hooks/useUpdateTask';

const EditTask = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [completedAt, setCompletedAt] = useState(
    task.completed_at ? parseISO(task.completed_at) : new Date()
  );
  const [open, setOpen] = useState(false);
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

      <View className='my-4'>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Fill with Completed Date
        </Button>
        <DatePicker
          modal
          open={open}
          date={completedAt}
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
