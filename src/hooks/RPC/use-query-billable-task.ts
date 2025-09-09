import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select?: string;
  name?: string;
  status?: string;
};

export const useQueryBillableTask = ({ select, name, status }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryBillableTask = async () => {
    setLoading(true);
    try {
      const { data: response, error: fetchError } = await supabase
        .rpc('search_billable_tasks', {
          name: name ?? '',
          bill_status: status ?? 'unpaid',
        })
        .select(select ?? '*');

      if (fetchError) {
        console.error('RPC error:', fetchError);
        setError(fetchError);
        setData(null);
      } else {
        setData(response);
      }
    } catch (err) {
      console.error('Unhandled error:', err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  const refetch = () => {
    queryBillableTask();
  };

  return { queryBillableTask, data, error, loading, clearData, refetch };
};
