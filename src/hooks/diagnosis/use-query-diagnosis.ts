import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select: string;
  name?: string;
  filter?: string;
  status?: string;
  from?: number;
  to?: number;
};

export const useQueryDiagnosis = ({
  select,
  name,
  filter,
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

  const queryDiagnosis = async () => {
    setLoading(true);
    try {
      const query = supabase
        .from('diagnosis')
        .select(select ?? '*', { count: 'exact' })
        .range(from, to)
        .eq('status', status);

      if (name) {
        query.or(
          `patient->>first_name.ilike.%${name}%,patient->>last_name.ilike.%${name}%,patient->>id.ilike.%${name}%`
        );
      }
      if (filter) {
        await query.filter('patient->>id', 'eq', filter);
      }

      const { data: response, count: responseCount, error: fetchError } = await query;

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

  return { queryDiagnosis, error, loading, data, count, clearData };
};
