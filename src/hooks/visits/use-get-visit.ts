import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataParams = {
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patient_id?: any;
  patient_lhc_id?: any;
  status?: string;
};

export const useGetVisit = ({ select, patient_id, status, patient_lhc_id }: GetDataParams) => {
  const supabase = createClient();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getVisit = async () => {
    try {
      setLoading(true);

      let query = supabase.from('visits').select(select);

      if (patient_id !== undefined && status !== undefined) {
        query = query.eq('patient_id', patient_id).eq('status', status);
      } else if (patient_id !== undefined) {
        query = query.eq('patient_id', patient_id);
      } else if (status !== undefined) {
        query = query.eq('status', status);
      } else {
        query = query.range(0, 10).order('id', { ascending: false });
      }

      if (patient_lhc_id !== undefined) {
        query = query.filter('patient->>id', 'eq', patient_lhc_id);
      }

      const { data: response, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    getVisit();
  };

  return { getVisit, error, loading, data, refetch };
};
