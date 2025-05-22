import { useState } from 'react';
import { createClient } from '../utils/supabase/client';

export function useRoleHook() {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);

  const getRole = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      setRole(data?.user?.user_metadata?.role);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };
  return { role, loading, error, getRole };
}
