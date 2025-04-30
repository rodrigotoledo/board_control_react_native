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

const EditProjectModal = ({ project }) => {
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
    <>
      <TouchableRipple
        onPress={showModal}
        className="my-2 mx-1 rounded-lg"
      >
        <Surface className="p-4 rounded-lg" elevation={2}>
          <Text className="text-base font-bold p-2 rounded-sm" style={{ color: darkTheme.colors.onSurface }}>
            {project.id} - {project.name}
          </Text>
        </Surface>
      </TouchableRipple>

      {/* Modal for Editing */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: darkTheme.colors.surface,
            padding: 20,
            margin: 20,
            borderRadius: 8,
          }}
        >
          <View className=''>
            <Text className='text-2xl mb-4'>
              Edit Project
            </Text>

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

            {/* Buttons */}
            <View className="flex flex-row">
              <Button
                onPress={hideModal}
                style={{ marginRight: 16 }}
                textColor={darkTheme.colors.secondary}
                buttonColor={darkTheme.colors.primaryContainer}
              >
                Cancel
              </Button>
              <Button
                onPress={handleSave}
                buttonColor={darkTheme.colors.primary}
                textColor={darkTheme.colors.onPrimary}
              >
                Save
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default EditProjectModal;
