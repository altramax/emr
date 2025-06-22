import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select: string;
  name?: string;
};

export const useQueryStaff = ({ select, name }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryStaff = async () => {
    try {
      setLoading(true);

      const query = supabase
        .from('staff')
        .select(select)
        .or(`first_name.ilike.%${name}%,last_name.ilike.%${name}`)
        .range(0, 10);

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

  return { queryStaff, error, loading, data, clearData };
};
