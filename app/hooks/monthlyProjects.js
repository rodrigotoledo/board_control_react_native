// src/hooks/monthlyProjects.js
import { useQuery } from '@tanstack/react-query';
import axios from '../..//axiosConfig';

export const monthlyProjects = (completedAt = '') => {
  // Se não for passada data, usa a data atual
  const effectiveDate = completedAt || new Date().toISOString().split('T')[0];

  return useQuery({
    queryKey: ['monthly-projects', effectiveDate],
    queryFn: async () => {
      const params = {
        completed_at: effectiveDate
      };

      const response = await axios.get('/api/v2/projects', { params });
      return response.data;
    },
    keepPreviousData: true
  });
};
