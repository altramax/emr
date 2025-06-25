import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  name?: string;
  id?: string;
};

export const useQueryDepartment = ({ name, id }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryDepartment = async () => {
    try {
      setLoading(true);
      let query = supabase.from('departments').select('*');

      if (name) {
        query = query.or(`name.ilike.%${name}%`);
      }

      if (id) {
        query = query.eq('id', id);
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
    queryDepartment();
  };

  return { queryDepartment, error, loading, data, clearData, refetch };
};
