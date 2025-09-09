import { useEffect } from 'react';
import { useGetData } from '@/src/hooks/use-get-data';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import VitalsReadingCards from '@/src/components/molecules/vitals-reading-cards/vitals-reading-cards';

interface PatientCareTableProps {
  visit_id: string;
  id: string;
}

export default function ViewVitalsTab({ visit_id, id }: PatientCareTableProps) {
  const { getData, data, loading } = useGetData({
    table: 'tasks',
    params: [
      {
        column: 'task_name',
        value: 'vitals',
      },
      {
        column: 'visit_id',
        value: visit_id,
      },
      {
        column: 'status',
        value: 'completed',
      },
    ],
    select: '*',
  });

  useEffect(() => {
    if (!visit_id) return;
    getData();
  }, [visit_id]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div>
        <VitalsReadingCards data={data} id={id} />
      </div>
    </div>
  );
}
