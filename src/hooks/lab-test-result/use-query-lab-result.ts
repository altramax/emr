import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select: string;
  test_name?: string;
  task_id?: string;
};

export const useQueryLabResult = ({ select, test_name, task_id }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryLabResult = async () => {
    setLoading(true);
    try {
      let query = supabase.from('lab_test_results').select(select).range(0, 10);

      if (test_name) {
        query = query.eq('test_name', test_name);
      }

      if (task_id) {
        query = query.eq('task_id', task_id);
      }
      const { data: response, error } = await query;
      if (error) {
        setError(error);
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

  const refetch = () => {
    queryLabResult();
  };

  return { queryLabResult, error, loading, data, clearData, refetch };
};
