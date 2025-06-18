import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  id: string;
};

export const useUpdateLabResult = ({ columns, id }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateLabResult = async () => {
    try {
      setLoading(true);

      const { data: response, error } = await supabase
        .from('lab_test_results')
        .update(columns)
        .eq('id', id)
        .select();

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

  return { updateLabResult, error, loading, data };
};
