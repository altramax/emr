import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
};

export const useInsertDepartment = ({ columns }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const insertDepartment = async () => {
    try {
      setLoading(true);

      const {
        data: response,
        error: insertError,
        status,
      } = await supabase.from('departments').insert([columns]);

      console.log(status);
      console.log(error);
      if (insertError || status >= 400) {
        setError(insertError);
      } else {
        setData(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { insertDepartment, error, loading, data };
};
