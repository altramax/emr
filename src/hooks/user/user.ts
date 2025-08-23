import { useState } from 'react';
import { createClient } from '@/src/utils/supabase/client';

export function useUser() {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, string | undefined>>({
    id: '',
    email: '',
    role: '',
    name: '',
  });
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);

  const getRole = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      // console.log(data);
      setUser({
        id: data?.user?.id,
        email: data?.user?.email,
        role: data?.user?.user_metadata?.role,
        name: data?.user?.user_metadata?.display_name,
      });
      setError(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return { user, loading, error, getRole };
}
