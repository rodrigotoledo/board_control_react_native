import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { darkTheme } from '@/constants/theme';
import { useUpdateTask } from '../hooks/useUpdateTask';

const EditTask = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [completedAt, setCompletedAt] = useState(undefined);
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateTask(task.id);

  const handleSave = () => {

    mutate(
      {
        title: title
        // completed_at: completedAt.toISOString()
      },
    );
  };

  const onDismiss = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setOpen(false);
      // setCompletedAt()
    },
    [setOpen]
  );


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
        <TimePickerModal
          visible={open}
          defaultInputType='keyboard'
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          use24HourClock={true}
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
