import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  tableName: string;
  select: string;
  name: string;
};

export const useQueryPatient = ({ tableName, select, name }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryPatient = async () => {
    try {
      setLoading(true);

      const query = supabase
        .from(tableName)
        .select(select)
        .or(`first_name.ilike.%${name}%,last_name.ilike.%${name},id.ilike.%${name}%`)
        .range(0, 10)
        .order('id', { ascending: false });

      if (name) {
        const { data: response } = await query;
        return setData(response);
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

  return { queryPatient, error, loading, data, clearData };
};
