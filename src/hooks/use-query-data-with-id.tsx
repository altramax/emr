import { createClient } from '../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type queryType = {
  column: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  value: any;
};

type queryDataWithIdType = {
  table: string;
  select?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patient_lhc_id?: any;
  params?: queryType[];
  from?: number;
  to?: number;
  errorMessage?: string;
  name?: string;
};

export const useQueryDataWithId = () => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number | null>(null);

  const queryDataWithId = async ({
    select,
    patient_lhc_id,
    table,
    params,
    from = 0,
    to = 9,
    errorMessage,
    name,
  }: queryDataWithIdType) => {
    try {
      setLoading(true);
      let query = supabase
        .from(table)
        .select(select ?? '*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      params?.forEach((items) => {
        query = query.eq(items.column, items.value);
      });

      if (name) {
        query.or(
          `patient->>first_name.ilike.%${name}%,patient->>last_name.ilike.%${name}%,patient->>id.ilike.%${name}%`
        );
      }

      if (patient_lhc_id) {
        query = query.filter('patient->>id', 'eq', patient_lhc_id);
      }

      const { data: response, error: fetchError, count: responseCount } = await query;

      if (fetchError) {
        setError(fetchError);
        toast.error(errorMessage ?? fetchError.message);
        setData(null);
      } else {
        setData(response);
        setCount(responseCount);
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

  return { queryDataWithId, error, loading, data, count, clearData };
};
