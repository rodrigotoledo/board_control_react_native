import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { View, Text, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/sign_up', { email, password });
      await AsyncStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    }
  };

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-5 w-full">
      <View className="w-full max-w-[400px] bg-white p-5 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-gray-800 mb-5 text-center">Sign Up</Text>

        <View className="mb-4">
          <TextInput
            mode="outlined"
            label="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <TextInput
            mode="outlined"
            label="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View className="mb-4">
          <TextInput
            mode="outlined"
            label="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <View className="flex-row justify-between mt-5">
          <Button icon="account-plus" mode="contained" onPress={handleSubmit}>
            <Text className="text-white font-bold">Create Account</Text>
          </Button>

          <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate('index')}>
            <Text className="text-white font-bold">Sign In</Text>
          </Button>

        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
