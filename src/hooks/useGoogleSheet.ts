import { useState, useEffect } from 'react';
import type { ProjectData } from '../types';
import { projectsData } from '../data/projectsData';

export const useGoogleSheet = () => {
  const [data, setData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setData(projectsData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred loading project data');
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};
