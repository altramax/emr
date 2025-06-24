import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select: string;
  name?: string;
  staff_id?: string;
};

export const useQueryStaff = ({ select, name, staff_id }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const queryStaff = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('staff')
        .select(select ?? '*')
        .range(0, 10);
      if (staff_id) {
        query = query.eq('staff_id', staff_id);
      }
      if (name) {
        query.or(`first_name.ilike.%${name}%,last_name.ilike.%${name}`);
      }
      const { data, error } = await query;
      if (error) {
        setError(error);
      } else {
        setData(data);
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
