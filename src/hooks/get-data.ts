import { createClient } from '../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  tableName: string;
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
};

export const useGetData = ({ tableName, select, id }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from(tableName)
        .select(select)
        .range(0, 10)
        .order('id', { ascending: false });

      if (id) {
        query = query.eq('id', id);
      }

      const { data: response } = await query;

      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const refetch = () => {
    getData();
  };

  return { getData, error, loading, data, refetch };
};
