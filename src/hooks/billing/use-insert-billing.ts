import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type GetDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  column: any;
};

export const useInsertBilling = ({ column }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const insertBill = async () => {
    setLoading(true);
    try {
      const { error: errorResponse } = await supabase.from('billing').insert(column);
      if (!errorResponse) {
        return 'success';
      } else {
        toast.error(errorResponse.message);
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

  return { insertBill, error, loading, data, clearData };
};
