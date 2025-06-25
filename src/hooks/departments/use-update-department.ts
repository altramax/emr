import { createClient } from '../../utils/supabase/client';
import { useState } from 'react';
import { toast } from 'react-toastify';

type getDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  columns: any;
  dept_id: string;
};

export const useUpdateDepartment = ({ columns, dept_id }: getDataType) => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateDepartment = async () => {
    try {
      setLoading(true);

      const { error: UpdateError, status } = await supabase
        .from('departments')
        .update([columns])
        .eq('id', dept_id)
        .select();

      console.log(status, UpdateError);

      if (UpdateError?.message) {
        toast.error(UpdateError?.message);
        return;
      } else {
        setData('success');
        toast.success('Department updated successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error updating department');
    } finally {
      setLoading(false);
    }
  };

  return { updateDepartment, loading, data };
};
