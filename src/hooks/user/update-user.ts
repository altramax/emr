import { useState } from 'react';
import { createClient } from '@/src/utils/supabase/client';

type User = {
  [key: string]: string | undefined;
};

export function UseUpdateUser(value: User) {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [error, setError] = useState<any>(null);

  const updateUser = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser(value);

      if (error) {
        setError(error);

        return;
      } else {
        setData(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateUser };
}
