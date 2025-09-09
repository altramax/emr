import { createClient } from '../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type updateType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
};

type updateDataType = {
  table: string;

  params?: updateType;
  errorMessage?: string;
  id: string;
};

export const useUpdateData = ({ table, params, errorMessage, id }: updateDataType) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);

  const updateData = async () => {
    try {
      setLoading(true);
      const query = supabase.from(table).update(params).eq('id', id);

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

  return { updateData, loading };
};
