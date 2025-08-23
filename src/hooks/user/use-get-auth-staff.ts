import { createClient } from '../../utils/supabase/client';
import { useUserStore } from '@/src/store/user-store';
import { toast } from 'react-toastify';

type getDataType = {
  emr_id?: string;
};

export const useGetAuthStaff = () => {
  const supabase = createClient();

  const { setUser } = useUserStore();

  const getAuthStaff = async ({ emr_id }: getDataType) => {
    try {
      let query = supabase.from('staff').select('*').range(0, 10);

      if (emr_id) {
        query = query.eq('emr_user_id', emr_id);
      }

      const { data: response, error: fetchError } = await query;

      if (fetchError) {
        toast.error('Failed to fetch your information');
        return;
      } else {
        setUser(response?.[0]);
      }
      return;
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch your information');
      return;
    }
  };

  return { getAuthStaff };
};
