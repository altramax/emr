'use client';
import { useRouter, usePathname } from 'next/navigation';
import { signOutAction } from '@/src/actions/actions';
import Avatar from '../../atoms/Avatar/Avatar';
import { useUser } from '@/src/hooks/user';
import { useEffect, useState } from 'react';
import PatientNav from '../patients/patients-nav';
import { CreditCard, Minus, FileChartColumn } from 'lucide-react';
// import { useMedicalUpdateAlert } from '@/src/hooks/medical-update-alert';
// import { useParams } from 'next/navigation';
import Notification from '../../molecules/notification/notification';

export default function DashboardMenu() {
  const [isPatientNavOpen, setIsPatientNavOpen] = useState(true);
  const [isRecordsNavOpen, setIsRecordsNavOpen] = useState(true);
  // const { detailsId } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = (item: string) => {
    router.push(`/${item}`);
  };

  // const { data } = useMedicalUpdateAlert();

  const { getRole, user } = useUser();

  useEffect(() => {
    getRole();
  }, []);

  const logout = async () => {
    const logout = await signOutAction();
    if (logout === 'success') {
      router.replace('/');
    }
  };

  const patientNavHandler = () => {
    setIsPatientNavOpen(!isPatientNavOpen);
  };

  const recordsNavHandler = () => {
    setIsRecordsNavOpen(!isRecordsNavOpen);
  };

  return (
    <aside className="no-scrollbar overflow-auto w-full h-full min-h-screen bg-blue-600 text-sm text-white px-6 pt-4 pb-9 space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-white text-blue-600 rounded flex items-center justify-center p-2 pt-0 px-1">
            <svg
              width="40"
              height="40"
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
          <h1 className="text-xl font-bold">LiLy HealthCare</h1>
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
            <button
              onClick={patientNavHandler}
              className={`mb-2 flex items-center justify-between hover:bg-blue-500 p-2 rounded w-full text-left text-base`}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 14a4 4 0 10-8 0M12 10a4 4 0 100-8 4 4 0 000 8zm0 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Patient Care
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                className={` ml-4 ${isPatientNavOpen && 'rotate-180 transform'}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10L8 6L12 10"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <PatientNav isOpen={isPatientNavOpen} params={pathname} />
          </div>

          <div className="border-b mb-6 pb-6 border-gray-500 w-full">
            <button
              onClick={recordsNavHandler}
              className={`mb-2 flex items-center justify-between hover:bg-blue-500 p-2 rounded w-full text-left text-base`}
            >
              <div className="flex items-center gap-2">
                <FileChartColumn size={18} />
                Records
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                className={` ml-4 ${isRecordsNavOpen && 'rotate-180 transform'}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10L8 6L12 10"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={`${!isRecordsNavOpen && 'hidden'} flex flex-col gap-3 border-l ml-4`}>
              <div className=" flex items-center">
                <Minus size={18} />
                <button
                  onClick={() => handleClick('records')}
                  className={`${pathname?.includes('/records') ? 'bg-blue-500' : ''} flex items-center gap-2 hover:bg-blue-500 p-2 rounded w-full text-left`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4zM8 2v4M16 2v4M4 10h16" />
                  </svg>
                  Initiate Encounter
                  <Notification count={3} />
                </button>
              </div>
              <div className=" flex items-center">
                <Minus size={18} />
                <button
                  onClick={() => handleClick('medical-records')}
                  className={`${pathname?.includes('/medical-records') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h16v16H4zM8 2v4M16 2v4M4 10h16" />
                  </svg>
                  Medical Records
                </button>
              </div>
              <div className="flex items-center">
                <Minus size={18} />

                <button
                  onClick={() => handleClick('/appointments')}
                  className={`${pathname?.includes('/appointments') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 7V3m8 4V3M3 9h18M5 19h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Appointments
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleClick('departments')}
            className={`${pathname?.includes('/departments') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
            </svg>
            Departments
          </button>

          <button
            onClick={() => handleClick('staff')}
            className={`${pathname?.includes('/staff') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.216.805 5.879 2.134M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Staff
          </button>

          <button
            onClick={() => handleClick('billing')}
            className={`${pathname?.includes('/billing') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <CreditCard size={18} className="w-5 h-5 mr-2" />
            Billing
          </button>

          <button
            onClick={() => handleClick('analytics')}
            className={`${pathname?.includes('/analytics') ? 'bg-blue-500' : ''} flex items-center hover:bg-blue-500 p-2 rounded w-full text-left`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 19V6M6 19v-4M16 19v-8M21 19v-12"></path>
            </svg>
            Analytics
          </button>
        </nav>

        <h2 className="text-sm text-blue-200 uppercase font-semibold mt-8 mb-4">Administration</h2>
        <button
          onClick={() => handleClick('Settings')}
          className="flex items-center hover:bg-blue-500 p-2 rounded w-full text-left"
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
        </button>

        <button
          onClick={logout}
          className="flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-white mt-4"
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

      <div className="flex text-sm text-gray-300  border-t border-gray-500 gap-2 pt-4">
        <Avatar firstname="Doe" lastname="John" size={50} />
        <div className="">
          <div className="mt-2">{user?.name}</div>
          <div>{user?.role}</div>
        </div>
      </div>
    </aside>
  );
}
