import DashboardMenu from '@/src/components/organisms/dashboard-menu/dashboard-menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex min-h-screen bg-gray-100 ">
        <div className="w-[20%] fixed h-full">
          <DashboardMenu />
        </div>
        <div className="w-[80%] relative ml-auto overflow-auto">{children}</div>
      </div>
    </section>
  );
}
