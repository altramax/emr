'use client';

import { Minus, FileChartColumn, UserRoundPlusIcon, CirclePlay, UserSearch } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Button from '../../atoms/button/button';

type nursesDashboardType = {
  isOpen: boolean;
};

export default function RecordsDashboard({ isOpen }: nursesDashboardType) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (item: string) => {
    router.push(`/${item}`);
  };

  return (
    <nav className={` ${isOpen ? 'w-full' : ''}`}>
      <span className={` ${isOpen ? '' : 'hidden'}`}>
        <Button
          value={
            <>
              <FileChartColumn size={18} />
              Records
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
            onClick={() => handleClick('records')}
            className={`relative ${pathname?.includes('/records') && !pathname?.includes('/records/new-patient') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <CirclePlay size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Start Consultation</span>
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
            onClick={() => handleClick('records/new-patient')}
            className={`relative ${pathname?.includes('/records/new-patient') || pathname?.includes('/records/edit-patient') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <UserRoundPlusIcon size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}> Add Patient</span>
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
            onClick={() => handleClick('patients')}
            className={`relative ${pathname?.includes('patients') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <UserSearch size={18} />

            <span className={` ${isOpen ? '' : 'hidden'}`}>Patients</span>
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
