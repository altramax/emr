'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import { Minus, Activity, CirclePlay, User, Stethoscope, FlaskConical } from 'lucide-react';
import Notification from '../../molecules/notification/notification';
import { useDiagnosesAlertStore } from '@/src/store/diagnoses-alert-store copy';
import { useGetDiagnoses } from '@/src/hooks/diagnoses/use-get-diagnoses';
import { useDiagnosesAlert } from '@/src/hooks/diagnoses/use-diagnoses-alert';

type nursesDashboardType = {
  isOpen: boolean;
};

export default function DoctorsDashboard({ isOpen }: nursesDashboardType) {
  const diagnosesState = useDiagnosesAlertStore((state) => state);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (item: string) => {
    router.push(`/${item}`);
  };

  const { data: alert } = useDiagnosesAlert();

  const { getDiagnoses, data } = useGetDiagnoses({
    select: '*',
    status: 'pending',
  });

  useEffect(() => {
    getDiagnoses();
  }, []);

  useEffect(() => {
    if (diagnosesState?.called === false) {
      diagnosesState?.setDiagnoses(data);
    }
    if (data?.length > 0) {
      diagnosesState?.setCalled(true);
    }
  }, [data]);

  useEffect(() => {
    if (alert) {
      diagnosesState.updateVital(alert);
    }
  }, [alert]);

  return (
    <nav className={` ${isOpen ? 'w-full ' : ''}`}>
      <span className={` ${isOpen ? '' : 'hidden'}`}>
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
        className={` w-fit flex flex-col   ${isOpen ? 'border-l ml-4 gap-3' : 'gap-8 mt-12 '} border-gray-200 pb-3 text-xs`}
      >
        <div className="flex items-center">
          <span className={` ${isOpen ? '' : 'hidden '}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('patients/add-vitals')}
            className={`relative ${pathname?.includes('patients/add-vitals') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <CirclePlay size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}> Add-Vitals </span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            ></span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden '}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('patients/add-diagnoses')}
            className={`relative ${pathname?.includes('patients/add-diagnoses') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Stethoscope size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}>Add Diagnoses</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {diagnosesState?.diagnoses?.length > 0 && (
                <Notification count={diagnosesState?.diagnoses?.length} />
              )}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden '}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('patients/inpatient')}
            className={`relative ${pathname?.includes('patients/inpatient') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Activity size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}> Inpatients</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden '}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('patients/lab-order')}
            className={`relative ${pathname?.includes('patients/lab-order') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <FlaskConical size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}> Lab order</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden '}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('patients/inpatient')}
            className={`relative ${pathname?.includes('patients/inpatient') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Activity size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}> Inpatients</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
