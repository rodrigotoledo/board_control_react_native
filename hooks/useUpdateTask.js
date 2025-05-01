import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../axiosConfig';

const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`/api/v2/tasks/${taskId}`, {
    task: taskData
  });
  return response.data;
};


export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateTask(taskId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['monthly-tasks', variables.completed_at]);
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      alert('Error saving: ' + error.message);
    }
  });
};
