import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patient_id?: any;
  visit_id?: any;
};

export const useGetLabResults = ({ select, patient_id, visit_id }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLabResult = async () => {
    try {
      setLoading(true);
      let query = supabase.from('lab_test_results').select(select).range(0, 10);

      if (patient_id) {
        query = query.eq('patient_id', patient_id);
      }
      if (visit_id) {
        query = query.eq('visit_id', visit_id);
      }

      const { data: response, error: fetchError } = await query;
      if (fetchError) {
        setError(fetchError);
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
    getLabResult();
  };

  return { getLabResult, error, loading, data, refetch };
};
