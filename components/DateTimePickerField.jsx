import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerField = ({ value, onChange }) => {
  const [date, setDate] = useState(value || new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');

  const handleChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      setDate(newDate);
      onChange(newDate);
    }
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View className="mb-4 w-full">
      {/* Date/Time Input */}
      <TextInput
        label="Fill with Completed AT"
        value={formatDateTime(date)}
        mode="outlined"
        className="bg-transparent w-full"
        theme={{
          colors: {
            primary: '#3b82f6', // blue-500
            text: '#1f2937', // gray-800
            placeholder: '#9ca3af', // gray-400
            background: 'transparent'
          }
        }}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => showMode('date')}
            color="#6b7280" // gray-500
          />
        }
        left={
          <TextInput.Icon
            icon="clock"
            onPress={() => showMode('time')}
            color="#6b7280" // gray-500
          />
        }
        editable={false}
      />

      {/* DateTime Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display={Platform.OS === 'android' ? 'default' : 'spinner'}
          onChange={handleChange}
          themeVariant="light"
          textColor="#ffffff" // white
          accentColor="#3b82f6" // blue-500
        />
      )}

      {/* Android Buttons */}
      {Platform.OS === 'android' && (
        <View className="flex-row mt-2 space-x-2">
          <Button
            mode="contained-tonal"
            onPress={() => showMode('date')}
            className="flex-1"
            labelStyle={{ color: '#1f2937' }} // blue-500
          >
            Change Date
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => showMode('time')}
            className="flex-1"
            labelStyle={{ color: '#1f2937' }} // blue-500
          >
            Change Time
          </Button>
        </View>
      )}
    </View>
  );
};

export default DateTimePickerField;
