import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';

import VitalsDropdown from '@/src/components/molecules/vitals-dropdown/vitals_dropdown';

interface PatientCareTableProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  visit_id: string;
  id: string;
}

export default function ViewVitalsTab({ visit_id, id }: PatientCareTableProps) {
  // const [isSelectedVitalsOpen, setIsSelectedVitalsOpen] = useState<boolean>(false);
  const router = useRouter();
  // const sampleVitals = {
  //   blood_pressure: '120/80 mmHg',
  //   heart_rate: '75 bpm',
  //   respiratory_rate: '16',
  //   temperature: '36.8 °C',
  //   oxygen_saturation: '98%',
  //   weight: '70 kg',
  //   height: '175 cm',
  // };

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
    <div>
      <button
        onClick={() => router.push(`/patients/add-vitals/${id}?from=/diagnosis`)}
        className="bg-blue-300 ml-auto w-fit px-4 py-2 block  text-xs text-white rounded-lg hover:bg-blue-500 mb-4"
      >
        Add Vitals
      </button>
      <div>
        {data
          ? data.map((item: any) => {
              return (
                <div key={item?.task_result?.created_at}>
                  <VitalsDropdown data={item} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
