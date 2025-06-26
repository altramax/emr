import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  staff_id: string;
};

export const useUpdateStaff = ({ columns, staff_id }: getDataType) => {
  const supabase = createClient();

  const [loading, setLoading] = useState<boolean>(false);

  const updateStaff = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from('staff').update(columns).eq('id', staff_id).select();

      if (error) {
        toast.error(error?.message);
        return;
      } else {
        toast.success('Staff updated successfully');
        return 'success';
      }
    } catch (err) {
      console.log(err);
      toast.error('Error updating staff');
    } finally {
      setLoading(false);
    }
  };

  return { updateStaff, loading };
};
