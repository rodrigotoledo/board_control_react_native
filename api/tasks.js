import axios from '../axiosConfig';

export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`/api/v2/tasks/${taskId}`, {
    task: taskData
  });
  return response.data;
};
