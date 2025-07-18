import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

// type dataType = Record<string, string>;

type getDataType = {
  tableName: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
};

export const useInsertTask = ({ tableName, columns }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const insertTask = async () => {
    try {
      setLoading(true);
      const { data: response, error } = await supabase.from(tableName).insert([columns]).select();
      console.log(error);
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

  const refetch = () => {
    insertTask();
  };

  return { insertTask, error, loading, data, refetch };
};
