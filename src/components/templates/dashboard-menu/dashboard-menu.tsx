'use client';

import Avatar from '../../atoms/Avatar/Avatar';
import { useUser } from '@/src/hooks/user/user';
import { useEffect, useState } from 'react';
import Button from '../../atoms/button/button';
import DoctorsDashboard from '../../organisms/dashboard-menu/doctors-dashboard';

import { Expand, Minimize, LogOut } from 'lucide-react';

import { Logout } from '@/src/hooks/user/logout';

export default function DashboardMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { getRole, user } = useUser();

  const { signOut } = Logout();

  const expandNavHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <aside
      className={`${isNavOpen ? 'w-full px-6' : 'w-14'} transition-all duration-300 ease-in-out no-scrollbar overflow-auto lg:w-full h-full min-h-screen bg-blue-600 text-sm text-white pt-4 pb-9 flex flex-col justify-start items-center`}
    >
      <div className="relative flex gap-2 items-center mt-2 mb-6">
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
        <h1 className={`text-lg font-bold ${isNavOpen ? '' : 'hidden lg:block'}`}>
          LiLy HealthCare
        </h1>
        <Button
          value={
            <>
              {!isNavOpen && <Expand size={24} />}
              {isNavOpen && <Minimize size={24} />}
            </>
          }
          className={`w-fit hover:bg-blue-500 p-2 rounded lg:hidden ${isNavOpen ? 'top-0' : 'absolute top-10'}`}
          onClick={expandNavHandler}
        />
      </div>

      {/* <NursesDashboard isOpen={isNavOpen} /> */}
      <DoctorsDashboard isOpen={isNavOpen} />
      {/* <DashboardMen /> */}

      <div className={`${isNavOpen ? 'w-[80%]' : ''} border-t border-gray-500 mt-auto`}>
        <button
          onClick={() => signOut()}
          className="flex items-center hover:bg-blue-500 p-2 rounded w-full text-left text-white mt-4 text-sm"
        >
          <LogOut size={18} className=" mr-2" />
          <span className={`${isNavOpen ? '' : 'hidden lg:block'}`}>Logout</span>
        </button>
        <div className=" flex justify-start items-center text-sm text-gray-300 gap-4 pt-4">
          <Avatar firstname="Doe" lastname="John" size={10} />

          <div className={`${isNavOpen ? '' : 'hidden lg:block'}`}>
            <div className="mt-2">{user?.name}</div>
            <div>{user?.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
