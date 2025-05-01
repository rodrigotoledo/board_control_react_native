import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';

const SignInScreen = () => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const today = new Date().toISOString().split('T')[0];
          navigation.replace('(authenticated)', { completed_at: today });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/sign_in', { email, password });
      await AsyncStorage.setItem('authToken', response.data.token);
      const today = new Date().toISOString().split('T')[0];
      navigation.replace('(authenticated)', { completed_at: today });
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4b5563" />
        <Text className="mt-4 text-gray-600">Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-5 w-full">
      <View className="w-full max-w-[400px] bg-white p-5 rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-gray-800 mb-5 text-center">Sign In</Text>

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

        <View className="flex-row justify-between mt-5">
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            Sign In
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('sign_up')}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
