import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignOutButton = () => {
  const router = useNavigation();
  return (
    <View className="mr-2">
      <Button icon="account-arrow-right" mode="contained"
        onPress={async () => {
          await AsyncStorage.removeItem('authToken');
          router.replace('(unauthenticated)');
        }}
      >
        <Text className="text-secondary p-2">Sign out</Text>
      </Button>
    </View>
  )
};

export default SignOutButton;
