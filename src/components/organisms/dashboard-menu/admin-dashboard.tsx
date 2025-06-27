'use client';

import {
  Minus,
  UserRoundPlusIcon,
  Shield,
  UserSearch,
  Boxes,
  FolderHeart,
  Store,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDiagnosisAlertStore } from '@/src/store/diagnosis-alert-store';
import { useGetDiagnosis } from '@/src/hooks/diagnosis/use-get-diagnosis';
import { useDiagnosisAlert } from '@/src/hooks/diagnosis//use-diagnosis-alert';
import Button from '../../atoms/button/button';

type nursesDashboardType = {
  isOpen: boolean;
};

export default function AdminDashboard({ isOpen }: nursesDashboardType) {
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
    <nav className={` ${isOpen ? 'w-full' : ''}`}>
      <span className={` ${isOpen ? '' : 'hidden'}`}>
        <Button
          value={
            <>
              <Shield size={18} />
              Admin
            </>
          }
          className={`mb-2 flex items-center justify-between p-2 rounded w-full text-left text-sm`}
        />
      </span>

      <div
        className={` w-fit flex flex-col   ${isOpen ? 'border-l ml-4 gap-3' : 'gap-8 mt-12 lg:mt-2 '} border-gray-200 pb-3 text-xs`}
      >
        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('admin/add-staff')}
            className={`relative ${pathname?.includes('add-staff') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <UserRoundPlusIcon size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Add Staff</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('admin/staff')}
            className={`relative ${pathname?.includes('/admin/staff') || pathname?.includes('/admin/edit-staff') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <UserSearch size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Staff</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('admin/departments')}
            className={`relative ${pathname?.includes('/admin/departments') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Boxes size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Departments</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('medical-records')}
            className={`relative ${pathname?.includes('/medical-records') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <FolderHeart size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Medical Records</span>
            <span
              className={` ${isOpen ? 'relative bottom-0 left-0' : 'absolute bottom-8 left-4 '} `}
            >
              {/* <Notification count={3} />{' '} */}
            </span>
          </button>
        </div>

        <div className="flex items-center ">
          <span className={` ${isOpen ? '' : 'hidden'}`}>
            <Minus size={18} />
          </span>

          <button
            onClick={() => handleClick('admin/inventory')}
            className={`relative ${pathname?.includes('admin/inventory') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <Store size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Inventory</span>
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
