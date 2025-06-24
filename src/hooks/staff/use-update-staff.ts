import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  staff_id: string;
};

export const useUpdateStaff = ({ columns, staff_id }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateStaff = async () => {
    try {
      setLoading(true);

      const { data: response, error } = await supabase
        .from('staff')
        .update(columns)
        .eq('id', staff_id)
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

  return { updateStaff, error, loading, data };
};
