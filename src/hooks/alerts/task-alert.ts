import { createClient } from '../../utils/supabase/client';
import { useEffect, useState, useMemo } from 'react';

export const useGetTasksAlert = () => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const channel = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        console.log('payload', payload);
        setData(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return useMemo(() => ({ data }), [data]);
};
