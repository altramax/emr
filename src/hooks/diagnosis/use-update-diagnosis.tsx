import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  id: string;
};

export const useUpdateDiagnosis = ({ columns, id }: getDataType) => {
  const supabase = createClient();

  const [loading, setLoading] = useState<boolean>(false);

  const UpdateDiagnosis = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from('diagnosis').update(columns).eq('id', id).select('*');

      if (error) {
        toast.error(error?.message);
      } else {
        toast.success('diagnosis updated successfully');
        return 'success';
      }
    } catch (err) {
      toast.error('Error updating diagnosis');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { UpdateDiagnosis, loading };
};
