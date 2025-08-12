import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select?: string;
  name?: string;
  filter?: string;
  task_name: string;
  status?: string;
  from?: number;
  to?: number;
};

export const useQueryTask = ({
  select,
  name,
  filter,
  task_name,
  status,
  from = 0,
  to = 9,
}: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number | null>(null);

  const queryTask = async () => {
    setLoading(true);
    try {
      const query = supabase
        .from('tasks')
        .select(select ?? '*', { count: 'exact' })
        .range(from, to)
        .eq('task_name', task_name);

      if (status !== 'all') {
        query.eq('status', status);
      }

      if (name) {
        query.or(
          `patient->>first_name.ilike.%${name}%,patient->>last_name.ilike.%${name}%,patient->>id.ilike.%${name}%`
        );
      }

      if (filter) {
        query.filter('patient->>id', 'eq', filter);
      }

      const { data: response, error: fetchError, count: responseCount } = await query;

      if (fetchError) {
        console.error('RPC error:', fetchError);
        setError(fetchError);
        setData(null);
      } else {
        setData(response);
        setCount(responseCount);
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

  return { queryTask, error, loading, data, count, clearData };
};
