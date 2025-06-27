import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
};

export const useInsertPatient = ({ columns }: getDataType) => {
  const supabase = createClient();

  const [loading, setLoading] = useState<boolean>(false);

  const insertPatient = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from('patients').insert([columns]).select();

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

  return { insertPatient, loading };
};
