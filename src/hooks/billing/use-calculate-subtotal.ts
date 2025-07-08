import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type objStructure = {
  name: string;
  quantity: number;
  discount: number;
};

type GetDataType = {
  items: objStructure[];
};

export const UseCalculateSubtotal = ({ items }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateSubtotal = async () => {
    setLoading(true);
    try {
      const { data: response, error: fetchError } = await supabase.rpc('calculate_subtotal', {
        items: items,
      });

      if (fetchError) {
        console.error('RPC error:', fetchError);
        setError(fetchError);
        setData(null);
      } else {
        setData(response);
      }
    } catch (err) {
      console.error('Unhandled error:', err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  return { calculateSubtotal, data, error, loading, clearData };
};
