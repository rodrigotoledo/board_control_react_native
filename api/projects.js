import axios from '../axiosConfig';

export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`/api/v2/projects/${projectId}`, {
    project: projectData
  });
  return response.data;
};
