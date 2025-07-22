'use client';

import DashboardMenu from '@/src/components/templates/dashboard-menu/dashboard-menu';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const expandNavHandler = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <section>
      <div className="flex min-h-screen bg-gray-100 ">
        <div
          className={`${isNavOpen ? 'w-[250px] lg:w-[310px]' : 'w-fit'} z-10 fixed lg:relative h-[100vh] overflow-y-auto no-scrollbar`}
        >
          <DashboardMenu isNavOpen={isNavOpen} expandNavHandler={expandNavHandler} />
        </div>
        <div
          className={`${isNavOpen ? 'w-[95%] ' : 'w-[95%]'} lg:w-full transition-all duration-400 ease-in-out relative ml-auto overflow-auto h-[100vh]`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
