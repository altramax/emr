'use client';

import Header from '@/src/components/organisms/dashboard-organisms/header';
import SummaryCardGroup from '@/src/components/organisms/dashboard-organisms/summary-card-group';
import RecentPatients from '@/src/components/organisms/dashboard-organisms/recent-patients';
import TodaysAppointments from '@/src/components/organisms/dashboard-organisms/todays-appointments';

export default function DashboardTemplate() {
  return (
    <main className=" p-5 flex-1">
      <Header />
      <SummaryCardGroup />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6">
        <RecentPatients />
        <TodaysAppointments />
      </div>
    </main>
  );
}
