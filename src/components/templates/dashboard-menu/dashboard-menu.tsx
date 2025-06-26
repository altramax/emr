'use client';

import Avatar from '../../atoms/Avatar/Avatar';
import { useUser } from '@/src/hooks/user/user';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import DoctorsDashboard from '../../organisms/dashboard-menu/doctors-dashboard';
import RecordsDashboard from '../../organisms/dashboard-menu/records-dashboard';
import AdminDashboard from '../../organisms/dashboard-menu/admin-dashboard';
import { Expand, Minimize, LogOut } from 'lucide-react';

import { Logout } from '@/src/hooks/user/logout';

type dashboardType = {
  isNavOpen: boolean;
  expandNavHandler: () => void;
};

export default function DashboardMenu({ isNavOpen, expandNavHandler }: dashboardType) {
  const { getRole, user } = useUser();

  const { signOut } = Logout();

  useEffect(() => {
    getRole();
  }, []);

  return (
    <aside
      className={`${isNavOpen ? 'w-full px-5  items-start' : 'w-14  items-center'} transition-all duration-400 ease-in-out no-scrollbar overflow-auto h-full min-h-screen bg-blue-600 text-sm text-white pb-9 flex flex-col justify-start`}
    >
      <div className="bg-blue-600 z-50 sticky top-0 pt-5  flex gap-2 items-center mt-2 mb-6">
        <div className="bg-white text-blue-600 rounded flex items-center justify-center p-2 pt-0 px-1">
          <svg
            width="25"
            height="25"
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
        <h1 className={`text-base font-bold ${isNavOpen ? '' : 'hidden'}`}>LiLy HealthCare</h1>
        <Button
          value={
            <>
              {!isNavOpen && <Expand size={23} />}
              {isNavOpen && <Minimize size={23} />}
            </>
          }
          className={`w-fit hover:bg-blue-500 p-1 rounded ${isNavOpen ? 'top-0' : 'absolute top-16 bg-blue-600 z-50'}`}
          onClick={expandNavHandler}
        />
      </div>

      <div className="flex flex-col space-y-5 ">
        {/* <NursesDashboard isOpen={isNavOpen} /> */}
        <DoctorsDashboard isOpen={isNavOpen} />
        <RecordsDashboard isOpen={isNavOpen} />
        <AdminDashboard isOpen={isNavOpen} />
        {/* <DashboardMen /> */}
      </div>

      <div className={`${isNavOpen ? 'w-[80%]' : ''} border-t border-gray-500 mt-auto`}>
        <button
          onClick={() => signOut()}
          className="flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-white mt-4 text-sm"
        >
          <LogOut size={18} className=" mr-2" />
          <span className={`${isNavOpen ? '' : 'hidden'}`}>Logout</span>
        </button>
        <div className=" flex justify-start items-center text-sm text-gray-300 gap-4 pt-4">
          <Avatar firstname="Doe" lastname="John" size={10} />

          <div className={`${isNavOpen ? '' : 'hidden'}`}>
            <div className="mt-2">{user?.name}</div>
            <div>{user?.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
