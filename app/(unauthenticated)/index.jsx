import React, { useState } from 'react';
import axios from '@/axiosConfig'
import { View, Text, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';


const SignInScreen = () => {
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/sign_in', { email, password });
      await AsyncStorage.setItem('authToken', response.data.token);
      const today = new Date().toISOString().split('T')[0];
      navigation.navigate('(authenticated)', { completed_at: today });
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center p-5 w-full">
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
          <Button icon="account-circle" mode="contained" onPress={handleSubmit}>
            <Text className="text-white font-bold">Sign In</Text>
          </Button>

          <Button icon="account-plus" mode="contained" onPress={() => navigation.navigate('sign_up')}>
            <Text className="text-white font-bold">Create Account</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
