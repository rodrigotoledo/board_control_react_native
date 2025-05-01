import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateTask(taskId, data),
    onSuccess: (data, variables) => { // Adicionamos os parâmetros
      // variables contém os dados enviados na mutate()
      queryClient.invalidateQueries(['monthly-tasks', variables.completed_at]);
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      alert('Error saving: ' + error.message);
    }
  });
};
