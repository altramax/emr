import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type GetDataType = {
  select: string;
  name?: string;
  filter?: string;
  status?: string;
};

export const useQueryDiagnoses = ({ select, name, filter, status }: GetDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const queryDiagnoses = async () => {
    try {
      const query = supabase.from('diagnoses').select(select).range(0, 10).eq('status', status);

      if (!name && filter === undefined && status === undefined) {
        const { data: response } = await query;
        return setData(response);
      }
      if (name !== undefined) {
        const { data: response } = await query.or(
          `patient->>first_name.ilike.%${name}%,patient->>last_name.ilike.%${name}%,patient->>id.ilike.%${name}%`
        );
        return setData(response);
      }
      if (filter !== undefined) {
        const { data: response } = await query.filter('patient->>id', 'eq', filter);
        return setData(response);
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

  return { queryDiagnoses, error, loading, data, clearData };
};
