// src/hooks/monthlyTasks.js
import { useQuery } from '@tanstack/react-query';
import axios from '../axiosConfig';

export const monthlyTasks = (completedAt = '') => {
  const effectiveDate = completedAt || new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: ['monthly-tasks', effectiveDate],
    queryFn: async () => {
      const params = {
        completed_at: effectiveDate
      };

      const response = await axios.get('/api/v2/tasks', { params });
      return response.data;
    },
    keepPreviousData: true
  });
};
