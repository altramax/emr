'use client';

import Avatar from '../../atoms/Avatar/Avatar';
import { useUser } from '@/src/hooks/user/user';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import DoctorsDashboard from '../../organisms/dashboard-menu/doctors-dashboard';
import RecordsDashboard from '../../organisms/dashboard-menu/records-dashboard';
import AdminDashboard from '../../organisms/dashboard-menu/admin-dashboard';
import { Expand, Minimize, LogOut } from 'lucide-react';
import Logo from '../../assets/icons/logo-icon';
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
      <div className="bg-blue-600 z-50 sticky top-0 pt-5 flex gap-2 items-center mt-2 mb-6">
        <Logo />
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
