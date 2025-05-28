import { createClient } from '../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  roleName: string;
  select: string;
};

export const useGetData = ({ roleName, select }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const { data: response } = await supabase
        .from(roleName)
        .select(select)
        .range(0, 10)
        .order('id', { ascending: false });
      //   .order('id', { ascending: false });
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
