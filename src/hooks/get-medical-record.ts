import { createClient } from '../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  tableName: string;
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id: any;
  status?: string;
};

export const useGetMedicalRecord = ({ tableName, select, id, status }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getMedicalData = async () => {
    try {
      setLoading(true);
      const { data: response } = await supabase
        .from(tableName)
        .select(select)
        .range(0, 10)
        .order('id', { ascending: false })
        .eq('patient_id', id)
        .eq('status', status);

      setData(response);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const refetch = () => {
    getMedicalData();
  };

  return { getMedicalData, error, loading, data, refetch };
};
