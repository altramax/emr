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
      const query = supabase.from('lab_test_results').select(select).range(0, 10);

      if (!test_name && task_id === undefined) {
        const { data: response } = await query;
        return setData(response);
      }
      if (test_name !== undefined) {
        const { data: response } = await query.eq('test_name', test_name);
        return setData(response);
      }

      if (task_id !== undefined) {
        const { data: response } = await query.eq('task_id', task_id);
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

  return { queryLabResult, error, loading, data, clearData };
};
