import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = 'https://18df-45-71-76-107.ngrok-free.app';
const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCompleteClick = async taskId => {
    try {
      await axios.patch(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  return (
    <>
      <View className="mx-10 mt-2">
        <Text className="text-2xl font-bold mb-4">Task List</Text>
      </View>
      <ScrollView className="container my-2">
        <View className="mx-4">
          {tasks.map(task => (
            <View
              key={task.id}
              className="border-b border-gray-200 mb-4 border border-gray-300">
              <Text className="border-b border-gray-200 px-4 py-2 text-left">
                {task.title}
              </Text>
              <Text className="border-b border-gray-200 px-4 py-2 text-left">
                {task.completed ? (
                  <Text className="text-green-500">Completed</Text>
                ) : (
                  <Text className="text-yellow-500">Pending</Text>
                )}
              </Text>
              <View className="border-b border-gray-200 px-4 py-2">
                {task.completed ? (
                  <Text className="text-green-500">
                    {new Date(task.updated_at).toLocaleString()}
                  </Text>
                ) : (
                  <TouchableOpacity
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onPress={() => handleCompleteClick(task.id)}>
                    <Text>Mark as Completed</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Tasks;
