import { DashboardView } from '@/components/dashboard/DashboardView';
import { Sidebar } from '@/components/navigation/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardView />
      </main>
    </div>
  );
}