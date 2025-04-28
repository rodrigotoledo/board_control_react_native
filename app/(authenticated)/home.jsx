import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Button, SafeAreaView  } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import {  } from 'react-native-safe-area-context';
const randomLock = Math.floor(Math.random() * 10000)
const posts = [
  {
    id: '1',
    title: 'Dorama Título 1 conteudo protegido',
    subtitle: 'Episódio 1 data 01/01/2015',
    type: 'image',
    imageUrl: `https://loremflickr.com/640/480?lock=${randomLock}`,
    likes: 42,
    reposts: 12,
    shares: 5,
    comments: [],
  },
  {
    id: '2',
    title: 'Dorama Título 2 conteudo protegido',
    subtitle: 'Curiosidade',
    type: 'video',
    imageUrl: `https://loremflickr.com/640/482?lock=${randomLock}`,
    likes: 56,
    reposts: 23,
    shares: 8,
    comments: [1,2,3,4],
  },
  {
    id: '3',
    title: 'Dorama Título 3 conteudo protegido',
    subtitle: 'Atores',
    type: 'video',
    imageUrl: `https://loremflickr.com/640/480?lock=${randomLock}`,
    likes: 56,
    reposts: 23,
    shares: 8,
    comments: [1,3],
  },
  // Adicione mais postagens conforme necessário
];

export default function DoramasAuth() {
  const [focusedId, setFocusedId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handleFocus = (id) => {
    setFocusedId(id);
  };

  const handleBlur = () => {
    setFocusedId(null);
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity activeOpacity={1} onPress={() => handleFocus(item.id)}>
      <View className="mb-6 bg-white p-4 rounded-lg shadow-lg">
        <Text className="text-lg font-bold mb-1">{item.title}</Text>
        <Text className="text-sm text-gray-500 mb-3">{item.subtitle}</Text>

        <TouchableOpacity
          onPress={() => handleFocus(item.id)}
          className="relative"
        >
          <Image
            source={{ uri: item.imageUrl }}
            className={`w-full h-64 rounded-lg ${focusedId === item.id ? 'opacity-100' : 'opacity-60'}`}
          />
          {item.type === 'video' && (
            <View className="absolute bottom-4 right-4 bg-black bg-opacity-50 p-2 rounded-full">
              <Ionicons name="play-circle" size={36} color="white" />
            </View>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-between mt-4 px-2">
          <TouchableOpacity className="flex-row items-center space-x-1">
            <FontAwesome name="heart" size={20} color="red" />
            <Text className="text-gray-700">({item.likes})</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center space-x-1">
            <MaterialIcons name="repeat" size={20} color="gray" />
            <Text className="text-gray-700">({item.reposts})</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center space-x-1">
            <Ionicons name="share-social" size={20} color="gray" />
            <Text className="text-gray-700">({item.shares})</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center space-x-1">
            <Ionicons name="chatbubble-outline" size={20} color="gray" />
            <Text className="text-gray-700">({item.comments.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center space-x-1">
            <Ionicons name="send" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center mt-3">
          <TextInput
            placeholder="Escreva um comentário..."
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
            className="flex-1 border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
          />
          <TouchableOpacity
            onPress={() => {
              console.log('Comentário enviado:', commentText);
              setCommentText(''); // Limpa o campo de texto
            }}
            className="ml-2 bg-secondary p-2 rounded-full"
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='mt-2'>
      <TouchableOpacity activeOpacity={1} onPress={handleBlur}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          className="bg-gray-100 p-4"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
