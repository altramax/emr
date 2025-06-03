import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

// type dataType = Record<string, string>;

type getDataType = {
  tableName: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
};

export const useInsertVisit = ({ tableName, columns }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const insertVisit = async () => {
    try {
      setLoading(true);

      const { data: response } = await supabase.from(tableName).insert([columns]).select();

      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const refetch = () => {
    insertVisit();
  };

  return { insertVisit, error, loading, data, refetch };
};
