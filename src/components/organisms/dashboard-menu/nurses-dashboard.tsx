'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import { Minus, Activity, CirclePlay, User } from 'lucide-react';

import Notification from '../../molecules/notification/notification';
import { useVitalsAlertStore } from '@/src/store/vitals-alert-store';
import { useTasksAlert } from '@/src/hooks/task/use-tasks-alert';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';

type nursesDashboardType = {
  isOpen: boolean;
};

export default function NursesDashboard({ isOpen }: nursesDashboardType) {
  const vitalState = useVitalsAlertStore((state) => state);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (item: string) => {
    router.push(`/${item}`);
  };

  const { data: taskAlert } = useTasksAlert();
  const { getTask, data } = useGetTasks({
    select: '*',
    task_name: 'vitals',
  });

  useEffect(() => {
    getTask();
  }, []);

  useEffect(() => {
    if (vitalState?.called === false) {
      vitalState?.setVitals(data);
    }
    if (data?.length > 0) {
      vitalState?.setCalled(true);
    }
  }, [data]);

  useEffect(() => {
    if (taskAlert) {
      vitalState.updateVital(taskAlert);
    }
  }, [taskAlert]);

  return (
    <nav className={` ${isOpen ? 'w-[80%]' : ''}`}>
      <span className={` ${isOpen ? '' : 'hidden lg:block'}`}>
        <Button
          value={
            <>
              <User size={20} className="mr-2" />
              Patient Care
            </>
          }
          className={`mb-2 flex items-center justify-between hover:bg-blue-500 p-2 rounded w-full text-left text-sm`}
        />
      </span>

      <div
        className={` w-fit flex flex-col   ${isOpen ? 'border-l ml-4 gap-3' : 'gap-8 lg:gap-3 mt-12 lg:border-l lg:ml-4 lg:mt-2 '} border-gray-200 pb-3 text-xs`}
      >
        <div className="flex items-center">
          <span className={` ${isOpen ? '' : 'hidden lg:block'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('add-vitals')}
            className={`relative ${pathname?.includes('add-vitals') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <CirclePlay size={18} />
            <span className={` ${isOpen ? '' : 'hidden lg:block'}`}> Add-Vitals </span>
            <span
              className={` ${isOpen ? '' : 'absolute bottom-8 left-4 lg:relative lg:bottom-0 lg:left-0'}`}
            >
              <Notification count={vitalState.vitals?.length} />
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden lg:block'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('add-vitals')}
            className={`relative ${pathname?.includes('add-vitals') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Activity size={18} />
            <span className={` ${isOpen ? '' : 'hidden lg:block'}`}> Inpatients</span>
            <span
              className={` ${isOpen ? '' : 'absolute bottom-8 left-4 lg:relative lg:bottom-0 lg:left-0'}`}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
