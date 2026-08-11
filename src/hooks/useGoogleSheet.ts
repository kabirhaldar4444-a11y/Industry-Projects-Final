import { useState } from 'react';
import type { ProjectData } from '../types';
import { projectsData } from '../data/projectsData';
import { formatProjectBudget } from '../utils/budgetFormatter';

export const useGoogleSheet = () => {
  const [data] = useState<ProjectData[]>(() =>
    projectsData.map(p => ({
      ...p,
      Budget: formatProjectBudget(p)
    }))
  );
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return { data, loading, error };
};
