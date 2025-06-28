import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';

type getDataType = {
  select?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  visit_id?: any;
  status?: string;
  task_name?: string;
  patient_lhc_id?: any;
  task_id?: any;
};

export const useGetTasks = ({
  select,
  visit_id,
  status,
  task_name,
  patient_lhc_id,
  task_id,
}: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getTask = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tasks')
        .select(select ?? '*')
        .range(0, 10);

      if (status) {
        query = query.eq('status', status);
      }

      if (visit_id !== undefined) {
        query = query.eq('visit_id', visit_id);
      }

      if (task_name) {
        query = query.eq('task_name', task_name);
      }

      if (task_id) {
        query = query.eq('id', task_id);
      }

      if (patient_lhc_id !== undefined) {
        query = query.filter('patient->>id', 'eq', patient_lhc_id);
      }

      const { data: response, error: fetchError } = await query;
      console.log(data);
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
    getTask();
  };

  return { getTask, error, loading, data, refetch };
};
