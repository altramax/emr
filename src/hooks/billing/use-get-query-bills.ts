import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select?: string;
  name?: string;
  department_id?: string;
};

export const useGetUnpaidBills = ({ select, name, department_id }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUnpaidBills = async () => {
    try {
      let query = supabase.from('inventory').select(select ?? '*');

      // const { data:response } = await supabase.from('unpaid_task_items').select();

      if (department_id) {
        query = query.eq('department_id', department_id);
      }
      if (name) {
        query = query.or(`name.ilike.%${name}%`);
      }
      const { data: response } = await query;
      return setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
  };

  return { getUnpaidBills, error, loading, data, clearData };
};
