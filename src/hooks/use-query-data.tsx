import { createClient } from '../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type queryType = {
  column: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  value: any;
};

type queryDataType = {
  table: string;
  select?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patient_lhc_id?: any;
  params?: queryType[];
  from?: number;
  to?: number;
  errorMessage?: string;
  nestedPatientName?: any;
  nameSearch?: string;
  singleName?: string;
};

export const useQueryData = ({
  select,
  patient_lhc_id,
  table,
  params,
  from = 0,
  to = 9,
  errorMessage,
  nestedPatientName,
  nameSearch,
  singleName,
}: queryDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number | null>(null);

  const queryData = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from(table)
        .select(select ?? '*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      params?.forEach((items) => {
        if (items.column === 'status' && items.value === 'all') {
          return;
        }
        query = query.eq(items.column, items.value);
      });

      if (nestedPatientName) {
        query.or(
          `patient->>first_name.ilike.%${nestedPatientName}%,patient->>last_name.ilike.%${nestedPatientName}%,patient->>id.ilike.%${nestedPatientName}%`
        );
      }

      if (nameSearch) {
        query.or(`first_name.ilike.%${nameSearch}%,last_name.ilike.%${nameSearch}%`);
      }

      if (singleName) {
        query = query.or(`name.ilike.%${singleName}%`);
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

  const refetch = () => {
    queryData();
  };

  const clearData = () => {
    setData(null);
  };

  return { queryData, error, loading, data, count, refetch, clearData };
};
