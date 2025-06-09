import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  id: string;
};

export const useUpdateTask = ({ columns, id }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateTask = async () => {
    console.log(id);
    try {
      setLoading(true);

      const { data: response } = await supabase.from('tasks').update(columns).eq('id', id).select();

      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { updateTask, error, loading, data };
};
