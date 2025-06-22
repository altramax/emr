import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  select: string;
};

export const useGetDepartments = ({ select }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDepartments = async () => {
    try {
      setLoading(true);
      const query = supabase.from('departments').select(select);
      const { data: response, error: fetchError } = await query;
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

  const refetch = () => {
    getDepartments();
  };

  return { getDepartments, error, loading, data, refetch };
};
