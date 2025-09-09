import { createClient } from '../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type queryType = {
  column: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  value: any;
};

type getDataType = {
  table: string;
  select?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patient_lhc_id?: any;
  params?: queryType[];
  from?: number;
  to?: number;
  errorMessage?: string;
};

export const useGetData = ({
  select,
  patient_lhc_id,
  table,
  params,
  from = 0,
  to = 9,
  errorMessage,
}: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
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

      //   if (status) {
      //     query = query.eq('status', status);
      //   }

      //   if (visit_id) {
      //     query = query.eq('visit_id', visit_id);
      //   }

      //   if (task_name) {
      //     query = query.eq('task_name', task_name);
      //   }

      //   if (task_id) {
      //     query = query.eq('id', task_id);
      //   }

      if (patient_lhc_id) {
        query = query.filter('patient->>id', 'eq', patient_lhc_id);
      }

      const { data: response, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError);
        setData(null);
        toast.error(errorMessage ?? fetchError.message);
        setData(null);
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
    getData();
  };

  return { getData, error, loading, data, refetch };
};
