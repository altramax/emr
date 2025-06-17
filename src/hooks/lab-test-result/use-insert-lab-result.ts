import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

// type dataType = Record<string, string>;

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
};

export const useInsertLabResult = ({ columns }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const insertLabResult = async () => {
    try {
      setLoading(true);

      const { data: response, error } = await supabase
        .from('lab_test_results')
        .insert([columns])
        .select();

      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setData(response);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { insertLabResult, error, loading, data };
};
