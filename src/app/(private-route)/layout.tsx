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
      <div className=" min-h-screen bg-gray-100 ">
        <div className="z-10 w-fit fixed h-full">
          <DashboardMenu isNavOpen={isNavOpen} expandNavHandler={expandNavHandler} />
        </div>
        <div
          className={`${isNavOpen ? 'w-[95%] lg:w-[77%] xl:w-[83%]' : 'w-[95%] lg:w-[95%] xl:w-[96%]'} transition-all duration-400 ease-in-out relative ml-auto overflow-auto`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
