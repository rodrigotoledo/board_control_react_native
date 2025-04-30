import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Surface,
  Text,
  Modal,
  TextInput,
  Button,
  Portal,
  HelperText
} from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { darkTheme } from '@/constants/theme';
import { useUpdateProject } from '../hooks/useUpdateProject';

const EditProject = ({ project }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(project.name);
  const [users, setUsers] = useState(project.users || '');
  const [completedAt, setCompletedAt] = useState(undefined);
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateProject(project.id);

  const handleSave = () => {

    mutate(
      {
        name: name,
        users: users,
        // completed_at: completedAt.toISOString()
      },
      {
        onSuccess: () => {
          hideModal();
        }
      }
    );
  };

  const onDismiss = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setOpen(false);
      setCompletedAt()
    },
    [setOpen]
  );


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);



  return (
    <View className=''>

      {/* Project ID (non-editable) */}
      <Text>
        ID: {project.id}
      </Text>

      {/* Name Input */}
      <TextInput
        label="Name"
        value={name}
        onKeyPress={(text) => setName(text)}
        mode="outlined"
        theme={{ colors: { text: darkTheme.colors.onSurface } }}
      />

      {/* Users Input */}
      <TextInput
        label="Users (comma-separated)"
        value={users}
        onKeyPress={(text) => setUsers(text)}
        mode="outlined"
        theme={{ colors: { text: darkTheme.colors.onSurface } }}
      />
      <HelperText type="info" style={{ color: darkTheme.colors.primary }}>
        Separate names with commas (e.g., "John, Jane")
      </HelperText>
      <View className='mb-4'>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Pick with Completed AT
        </Button>
        <TimePickerModal
          visible={open}
          defaultInputType='keyboard'
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          use24HourClock={true}
        />
      </View>

      <Button
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
