import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../api/projects';

export const useUpdateProject = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateProject(projectId, data),
    onSuccess: (data, variables) => { // Adicionamos os parâmetros
      // variables contém os dados enviados na mutate()
      queryClient.invalidateQueries(['monthly-projects', variables.completed_at]);
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      alert('Error saving: ' + error.message);
    }
  });
};
