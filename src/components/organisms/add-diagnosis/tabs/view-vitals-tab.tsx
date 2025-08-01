import { useEffect } from 'react';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import VitalsReadingCards from '@/src/components/molecules/vitals-reading-cards/vitals-reading-cards';

interface PatientCareTableProps {
  visit_id: string;
  id: string;
}

export default function ViewVitalsTab({ visit_id, id }: PatientCareTableProps) {
  const { getTask, data, loading } = useGetTasks({
    task_name: 'vitals',
    select: '*',
    visit_id: visit_id,
    status: 'completed',
  });

  useEffect(() => {
    getTask();
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
