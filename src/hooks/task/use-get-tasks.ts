import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
  status?: string;
  name?: string;
};

export const useGetTasks = ({ select, id, status, name }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTask = async () => {
    try {
      setLoading(true);
      let query = supabase.from('tasks').select(select).range(0, 10);

      if (id !== undefined) {
        query = query.eq('patient_id', id);
      }
      if (status !== undefined) {
        query = query.eq('status', status);
      }
      if (name !== undefined) {
        query = query.eq('task_name', name);
      }

      const { data: response } = await query;

      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const refetch = () => {
    getTask();
  };

  return { getTask, error, loading, data, refetch };
};
