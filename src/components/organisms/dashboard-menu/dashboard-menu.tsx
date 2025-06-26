'use client';
import { useRouter, usePathname } from 'next/navigation';
import { signOutAction } from '@/src/actions/actions';
import Avatar from '../../atoms/Avatar/Avatar';
import { useUser } from '@/src/hooks/user/user';
import { useEffect, useState } from 'react';
import Button from '../../atoms/button/button';
import {
  HeartPulse,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  TestTube2,
  Pill,
  Syringe,
  Minus,
  Users,
  CreditCard,
  FileChartColumn,
  UserRoundPlusIcon,
  CirclePlay,
  User,
  Boxes,
  FolderHeart,
  Expand,
  Minimize,
} from 'lucide-react';

import Notification from '../../molecules/notification/notification';
import { useVitalsAlertStore } from '@/src/store/vitals-alert-store';
import { useTasksAlert } from '@/src/hooks/task/use-tasks-alert';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';

export default function DashboardMenu() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const vitalState = useVitalsAlertStore((state) => state);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getRole();
  }, []);

  const { getRole, user } = useUser();

  const logout = async () => {
    vitalState?.clear();
    vitalState?.setCalled(false);
    const logout = await signOutAction();
    if (logout === 'success') {
      router.replace('/');
    }
  };

  const handleClick = (item: string) => {
    router.push(`/${item}`);
  };

  const expandNavHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  const tabs = [
    {
      name: 'Add-Vitals',
      path: '/patients/add-vitals',
      icon: <HeartPulse size={18} />,
      Notification: <Notification count={vitalState?.vitals?.length} />,
    },
    { name: 'Add Diagnosis', path: '/patients/add-diagnosis', icon: <Stethoscope size={18} /> },
    { name: 'Prescriptions', path: '/patients/prescriptions', icon: <ClipboardList size={18} /> },
    { name: 'Lab Orders', path: '/patients/lab-orders', icon: <FlaskConical size={18} /> },
    { name: 'Lab Results', path: '/patients/lab-results', icon: <TestTube2 size={18} /> },
    { name: 'Dispensed Meds', path: '/patients/dispensed-meds', icon: <Pill size={18} /> },
    { name: 'Administered Meds', path: '/patients/administered-meds', icon: <Syringe size={18} /> },
  ];

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
    <aside
      className={`${isNavOpen ? 'w-full' : 'w-12'} no-scrollbar overflow-auto lg:w-full h-full min-h-screen bg-blue-600 text-sm text-white pt-4 pb-9 space-y-4 flex flex-col justify-between items-center`}
    >
      <div className="">
        <div className="flex gap-2 items-center mt-2 mb-6">
          <div className="bg-white text-blue-600 rounded flex items-center justify-center p-2 pt-0 px-1">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.24 23.84c-.04 0-.04 0-.08 0-.4-.04-.72-.36-.76-.76l-1-9.96-.88 2.72c-.12.36-.44.56-.8.56H.84A.83.83 0 0 1 0 15.6c0-.44.36-.84.84-.84h5.32l1.92-6c.12-.36.48-.6.88-.56s.68.36.72.76l.96 9.72 2.04-6.96c.12-.36.4-.6.8-.6.36 0 .68.28.8.64l1.12 4.84.84-1.24c.16-.24.4-.36.68-.36h5.28c.44 0 .84.36.84.84s-.36.84-.84.84h-4.84l-1.64 2.44c-.2.28-.52.4-.84.36s-.6-.32-.64-.64l-.84-3.6-2.36 8.08c-.12.28-.44.52-.8.52z"
                fill="#1E40AF"
              />
            </svg>
          </div>
          <h1 className="text-lg font-bold">LiLy HealthCare</h1>
          <Button
            value={
              <>
                {!isNavOpen && <Expand size={24} />}
                {isNavOpen && <Minimize size={24} />}
              </>
            }
            className="w-fit hover:bg-blue-500 p-2 rounded"
            onClick={expandNavHandler}
          />
        </div>

        <nav className="space-y-2">
          {/* <button
            onClick={() => handleClick('dashboard')}
            className={`${pathname?.includes('/dashboard') && pathname === '/dashboard' ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
        
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
            </svg>
            Dashboard
          </button> */}

          <div className="border-b mb-6 pb-6 border-gray-500 w-full">
            <Button
              value={
                <>
                  <User size={20} className="mr-2" />
                  <p>Patient Care</p>
                </>
              }
              className={`mb-2 flex items-center justify-between hover:bg-blue-500 p-2 rounded w-full text-left text-sm`}
            />

            <div className=" text-white">
              <div className="flex flex-col gap-3 border-l border-gray-200 pb-3 ml-4 text-xs">
                {tabs.map((tab) => {
                  return (
                    <div className={` flex items-center justify-start `} key={tab.name}>
                      <Minus size={18} />
                      <button
                        className={`w-full px-4 py-2 flex items-center hover:bg-blue-500 rounded-md gap-2
                ${pathname.includes(tab.name.toLowerCase()) && 'bg-blue-500 text-white'}`}
                        onClick={() => router.push(tab.path)}
                      >
                        {tab.icon}
                        {tab.name}
                        <div className="ml-2">{tab.Notification}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* <div className="border-b border-gray-200 my-6"></div>   */}
            </div>
          </div>

          <div className="border-b mb-6 pb-6 border-gray-500 w-full">
            <button
              className={`mb-2 flex items-center justify-between hover:bg-blue-500 p-2 rounded w-full text-left text-sm`}
            >
              <div className="flex items-center gap-2">
                <FileChartColumn size={18} />
                Records
              </div>
            </button>

            <div className={` flex flex-col gap-3 border-l ml-4 text-xs`}>
              <div className=" flex items-center">
                <Minus size={18} />
                <button
                  onClick={() => handleClick('records')}
                  className={`${pathname?.includes('/records') && !pathname?.includes('/records/new-patient') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
                >
                  <CirclePlay size={18} />
                  Start Consultation
                  {/* <Notification count={3} /> */}
                </button>
              </div>
              <div className=" flex items-center">
                <Minus size={18} />
                <button
                  onClick={() => handleClick('records/new-patient')}
                  className={`${pathname?.includes('/records/new-patient') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
                >
                  <UserRoundPlusIcon size={18} />
                  Add Patient
                  {/* <Notification count={3} /> */}
                </button>
              </div>
              <div className=" flex items-center">
                <Minus size={18} />
                <button
                  onClick={() => handleClick('medical-records')}
                  className={`${pathname?.includes('/medical-records') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
                >
                  <FolderHeart size={18} className="w-5 h-5 mr-2" />
                  Medical Records
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleClick('departments')}
            className={`${pathname?.includes('/departments') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-sm`}
          >
            <Boxes size={18} className="mr-2" />
            Departments
          </button>

          <button
            onClick={() => handleClick('staff')}
            className={`${pathname?.includes('/staff') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-sm`}
          >
            <Users size={18} className="mr-2" />
            Staff
          </button>

          <button
            onClick={() => handleClick('billing')}
            className={`${pathname?.includes('/billing') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-sm`}
          >
            <CreditCard size={18} className="w-5 h-5 mr-2" />
            Billing
          </button>
        </nav>

        <h2 className="text-sm text-blue-200 uppercase font-semibold mt-8 mb-4 ">Administration</h2>
        {/* <button
          onClick={() => handleClick('Settings')}
          className="flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5zm7.94-2.5a7.993 7.993 0 00.06-1 7.993 7.993 0 00-.06-1l2.06-1.62a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.6-.22l-2.43.97a8.003 8.003 0 00-1.73-1L15.5 2.5a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5l-.38 2.63a8.003 8.003 0 00-1.73 1l-2.43-.97a.5.5 0 00-.6.22l-2 3.46a.5.5 0 00.12.64L4.06 11a7.993 7.993 0 000 2l-2.06 1.62a.5.5 0 00-.12.64l2 3.46a.5.5 0 00.6.22l2.43-.97a8.003 8.003 0 001.73 1L8.5 21.5a.5.5 0 00.5.5h4a.5.5 0 00.5-.5l.38-2.63a8.003 8.003 0 001.73-1l2.43.97a.5.5 0 00.6-.22l2-3.46a.5.5 0 00-.12-.64z" />
          </svg>
          Settings
        </button> */}

        <button
          onClick={logout}
          className="flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-white mt-4 text-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>

      <div className="flex justify-start items-center text-sm text-gray-300  border-t border-gray-500 gap-2 pt-4">
        <Avatar firstname="Doe" lastname="John" size={10} />
        <div className="">
          <div className="mt-2">{user?.name}</div>
          <div>{user?.role}</div>
        </div>
      </div>
    </aside>
  );
}
