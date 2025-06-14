import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  select: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  visit_id?: any;
  status?: string;
  task_name?: string;
  patient_lhc_id?: any;
};

export const useGetTasks = ({
  select,
  visit_id,
  status,
  task_name,
  patient_lhc_id,
}: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTask = async () => {
    try {
      setLoading(true);
      let query = supabase.from('tasks').select(select).range(0, 10).eq('status', status);

      if (visit_id !== undefined) {
        query = query.eq('visit_id', visit_id);
      }

      if (task_name !== undefined) {
        query = query.eq('task_name', task_name);
      }

      if (patient_lhc_id !== undefined) {
        query = query.filter('patient->>id', 'eq', patient_lhc_id);
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
    getTask();
  };

  return { getTask, error, loading, data, refetch };
};
