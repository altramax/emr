import DashboardMenu from '@/src/components/organisms/dashboard-menu/dashboard-menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64">
          <DashboardMenu />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
