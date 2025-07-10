'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import {
  Minus,
  Activity,
  CirclePlay,
  User,
  Stethoscope,
  Microscope,
  Pill,
  HandCoins,
} from 'lucide-react';
import Notification from '../../molecules/notification/notification';
import { useDiagnosisAlertStore } from '@/src/store/diagnosis-alert-store';
import { useGetDiagnosis } from '@/src/hooks/diagnosis/use-get-diagnosis';
import { useDiagnosisAlert } from '@/src/hooks/diagnosis/use-diagnosis-alert';

type nursesDashboardType = {
  isOpen: boolean;
};

export default function DoctorsDashboard({ isOpen }: nursesDashboardType) {
  const diagnosisState = useDiagnosisAlertStore((state) => state);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (item: string) => {
    router.push(`/${item}`);
  };

  const { data: alert } = useDiagnosisAlert();

  const { getDiagnosis, data } = useGetDiagnosis({
    select: '*',
    status: 'pending',
  });

  useEffect(() => {
    getDiagnosis();
  }, []);

  useEffect(() => {
    if (diagnosisState?.called === false) {
      diagnosisState?.setDiagnosis(data);
    }
    if (data?.length > 0) {
      diagnosisState?.setCalled(true);
    }
  }, [data]);

  useEffect(() => {
    if (alert) {
      diagnosisState.updateVital(alert);
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
          className={`mb-2 flex items-center justify-between p-2 rounded w-full text-left text-sm`}
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
            onClick={() => handleClick('add-vitals')}
            className={`relative ${pathname?.includes('add-vitals') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
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
            onClick={() => handleClick('add-diagnosis')}
            className={`relative ${pathname?.includes('add-diagnosis') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Stethoscope size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}>Add Diagnosis</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {diagnosisState?.diagnosis?.length > 0 && (
                <Notification count={diagnosisState?.diagnosis?.length} />
              )}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden '}`}>
            <Minus size={18} />
          </span>

          <button
            // onClick={() => handleClick('patients/inpatient')}
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
            onClick={() => handleClick('lab-order')}
            className={`relative ${pathname?.includes('lab-order') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Microscope size={18} />
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
            // onClick={() => handleClick('medication-order')}
            className={`relative ${pathname?.includes('medication-order') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Pill size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}> Medication order</span>
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
            onClick={() => handleClick('billing')}
            className={`relative ${pathname?.includes('billing') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <HandCoins size={18} />
            <span className={` ${isOpen ? '' : 'hidden '}`}>Billing</span>
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
