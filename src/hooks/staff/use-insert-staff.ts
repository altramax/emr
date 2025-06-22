import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

// type dataType = Record<string, string>;

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
};

export const useInsertStaff = ({ columns }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const insertStaff = async () => {
    try {
      setLoading(true);

      const { data: response, error } = await supabase.from('staff').insert([columns]).select();

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

  return { insertStaff, error, loading, data };
};
