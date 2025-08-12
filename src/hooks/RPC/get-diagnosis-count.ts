import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useDiagnosisCount = () => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiagnosisCount = async () => {
    try {
      setLoading(true);

      const { data: response, error: fetchError } = await supabase.rpc(
        'get_diagnosis_status_counts'
      );

      if (fetchError) {
        setError(fetchError);
        toast.error('error fetching counts');
      } else {
        setData(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    getDiagnosisCount();
  };

  return { getDiagnosisCount, error, loading, data, refetch };
};
