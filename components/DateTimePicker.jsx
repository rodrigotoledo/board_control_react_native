import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

const DateTimePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(value || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateConfirm = (selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate.date);
    setShowTimePicker(true); // Abre o time picker após selecionar a data
  };

  const handleTimeConfirm = ({ hours, minutes }) => {
    const newDateTime = new Date(date);
    newDateTime.setHours(hours, minutes);
    onChange(newDateTime);
    setShowTimePicker(false);
  };

  return (
    <>
      {/* Input que dispara os pickers */}
      <TextInput
        label="Data e Hora"
        value={date.toLocaleString('pt-BR')}
        right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
        mode="outlined"
        editable={false}
      />

      {/* Date Picker */}
      <DatePickerModal
        locale="pt-BR"
        mode="single"
        visible={showDatePicker}
        onDismiss={() => setShowDatePicker(false)}
        date={date}
        onConfirm={handleDateConfirm}
        theme={{
          colors: {
            primary: '#BB86FC',       // Cor roxa do Material You
            onSurface: '#E1E1E1',    // Texto claro
            surface: '#1E1E1E',      // Fundo escuro
          }
        }}
      />

      {/* Time Picker */}
      <TimePickerModal
        visible={showTimePicker}
        onDismiss={() => setShowTimePicker(false)}
        onConfirm={handleTimeConfirm}
        hours={date.getHours()}
        minutes={date.getMinutes()}
        theme={{
          colors: {
            primary: '#BB86FC',
            onSurface: '#E1E1E1',
            surface: '#1E1E1E',
          }
        }}
      />
    </>
  );
};

// Como usar no seu componente:
const MyComponent = () => {
  const [datetime, setDatetime] = useState(new Date());

  return (
    <DateTimePicker
      value={datetime}
      onChange={setDatetime}
    />
  );
};
