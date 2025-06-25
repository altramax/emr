import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  department_id?: any;
  select?: string;
};

export const useGetStaff = ({ department_id, select }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getStaff = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('staff')
        .select(select ?? '*')
        .range(0, 10);

      if (department_id) {
        query = query.eq('department_id', department_id);
      }

      const { data: response, error: fetchError } = await query;
      if (fetchError) {
        setError(fetchError);
      } else {
        setData(response);
      }
      return;
    } catch (err) {
      setError(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    getStaff();
  };

  return { getStaff, error, loading, data, refetch };
};
