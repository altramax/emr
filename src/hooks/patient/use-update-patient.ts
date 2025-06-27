import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
};

export const useUpdatePatient = ({ columns, id }: getDataType) => {
  const supabase = createClient();

  const [loading, setLoading] = useState<boolean>(false);

  const updatePatient = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from('patients').update([columns]).eq('id', id).select();

      if (error) {
        toast.error(error?.message);
      } else {
        toast.success('Staff added successfully');
        return 'success';
      }
    } catch (err) {
      toast.error('Error creating staff');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { updatePatient, loading };
};
