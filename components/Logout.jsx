import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  useEffect(() => {
    removeAuthToken();
  }, []);
  const navigation = useNavigation()

  const removeAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('SignIn')
  };

  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-4xl text-slate-700">Board Control</Text>
      <View className="w-full flex flex-row space-x-2 items-center justify-center align-middle">
        <Text className="text-2xl text-slate-700">Logout</Text>

        <MaterialCommunityIcons
          name="logout"
          color={'#334155'}
          size={50}
          />
      </View>
    </View>
  )
};

export default Logout;
