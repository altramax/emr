import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataParams = {
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
  status?: string;
};

export const useGetVisit = ({ select, id, status }: GetDataParams) => {
  const supabase = createClient();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getVisit = async () => {
    try {
      setLoading(true);

      let query = supabase.from('visits').select(select);

      if (id !== undefined && status !== undefined) {
        query = query.eq('patient_id', id).eq('status', status);
      } else if (id !== undefined) {
        query = query.eq('patient_id', id);
      } else if (status !== undefined) {
        query = query.eq('status', status);
      } else {
        query = query.range(0, 10).order('id', { ascending: false });
      }

      const { data: response, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    getVisit();
  };

  return { getVisit, error, loading, data, refetch };
};
