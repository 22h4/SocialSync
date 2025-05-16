import { getServerSession } from 'next-auth';
import DashboardClient from './DashboardClient';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return <DashboardClient>{children}</DashboardClient>;
} 