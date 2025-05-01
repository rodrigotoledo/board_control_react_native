import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../axiosConfig';

const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`/api/v2/projects/${projectId}`, {
    project: projectData
  });
  return response.data;
};


export const useUpdateProject = (projectId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateProject(projectId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['monthly-projects', variables.completed_at]);
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      alert('Error saving: ' + error.message);
    }
  });
};
