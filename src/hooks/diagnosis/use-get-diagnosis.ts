import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
  status?: string;
  filter?: any;
};

export const useGetDiagnosis = ({ select, id, status, filter }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiagnosis = async () => {
    try {
      setLoading(true);
      let query = supabase.from('diagnosis').select(select).range(0, 10).eq('status', status);

      if (id !== undefined) {
        query = query.eq('patient_id', id);
      }
      if (filter !== undefined) {
        query = query.filter('patient->>id', 'eq', filter);
      }

      const { data: response } = await query;

      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const refetch = () => {
    getDiagnosis();
  };

  return { getDiagnosis, error, loading, data, refetch };
};
