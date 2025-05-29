import { createClient } from '../utils/supabase/client';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';

export const useMedicalUpdateAlert = () => {
  const supabase = createClient();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    console.log('ran');
    const channel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'medical_records' },
        (payload) => {
          setData(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return useMemo(() => ({ data }), [data]);
};
