import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {

  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigation = useNavigation()

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('/sign_in', data);
      const token = response.data.token;
      await AsyncStorage.setItem('authToken', token);
      navigation.navigate('AuthenticatedTabs')
    } catch (error) {
      console.log('Error sign in:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-4xl text-slate-700">Board Control</Text>
      <View className="w-full flex flex-row space-x-2 items-center justify-center align-middle">
        <Text className="text-2xl text-slate-700">Sign In</Text>

        <MaterialCommunityIcons
          name="login"
          color={'#334155'}
          size={50}
          />
      </View>
        
      <View className="w-full flex space-y-4 px-10">

        {error !== '' && <Text className="text-red-500">{error}</Text>}
        <View >
          <Text>Email:</Text>
          <TextInput
            className="border border-slate-600 rounded-md p-2"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Type your email address"
            keyboardType='email-address'
            />
        </View>

        <View>
          <Text>Password:</Text>
          <TextInput
            className="border border-slate-600 rounded-md p-2"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholder="Type your password"
            />
        </View>

        <TouchableOpacity
          className="bg-slate-600 rounded-md p-4"
          onPress={handleLogin}
          >
          <Text className="text-center text-white">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default SignIn;
