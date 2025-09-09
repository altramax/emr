import { createClient } from '../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type insertType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

type insertDataType = {
  table: string;

  params?: insertType;
  errorMessage?: string;
  id?: string;
};

export const useInsertData = ({ table, params, errorMessage, id }: insertDataType) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);

  const insertData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(table).insert(params);

      if (id) {
        query = query.eq('id', id);
      }

      const { error } = await query;

      if (error) {
        toast.error(errorMessage ?? error.message);
        return 'failed';
      } else {
        return 'success';
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { insertData, loading };
};
