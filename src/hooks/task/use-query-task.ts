import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select: string;
  name?: string;
  filter?: string;
  task_name: string;
};

export const useQueryTask = ({ select, name, filter, task_name }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const queryTask = async () => {
    try {
      const query = supabase.from('tasks').select(select).range(0, 10).eq('task_name', task_name);

      if (!name && filter === undefined) {
        const { data: response } = await query;
        return setData(response);
      }
      if (name !== undefined) {
        const { data: response } = await query.or(
          `patient->>first_name.ilike.%${name}%,patient->>last_name.ilike.%${name}%,patient->>id.ilike.%${name}%`
        );
        return setData(response);
      }
      if (filter !== undefined) {
        const { data: response } = await query.filter('patient->>id', 'eq', filter);
        return setData(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
  };

  return { queryTask, error, loading, data, clearData };
};
