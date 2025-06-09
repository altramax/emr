import DashboardMenu from '@/src/components/templates/dashboard-menu/dashboard-menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="lg:flex min-h-screen bg-gray-100 ">
        <div className="z-10 w-fit lg:w-[20%] xl:w-[18%] fixed h-full">
          <DashboardMenu />
        </div>
        <div className="w-[95%] lg:w-[80%] xl:w-[82%] relative ml-auto overflow-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
