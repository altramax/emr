import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select?: string;
  name?: string;
  filter?: string;
  // task_name: string;
  status?: string;
};

export const useQueryBillableTask = ({ select, name, filter, status }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const queryBillableTask = async () => {
    try {
      let query = supabase
        .from('tasks')
        .select(select ?? '*')
        .range(0, 10);
      // .eq('status', status);

      if (status !== 'all') {
        query = query.eq('status', status);
      }

      if (name !== undefined) {
        query = query.or(
          `patient->>first_name.ilike.%${name}%,patient->>last_name.ilike.%${name}%,patient->>id.ilike.%${name}%`
        );
      }
      if (filter !== undefined) {
        query = query.filter('patient->>id', 'eq', filter);
      }

      const { data: response, error: fetchError } = await query;
      console.log(data);
      if (fetchError) {
        setError(fetchError);
      } else {
        setData(response);
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

  return { queryBillableTask, error, loading, data, clearData };
};
