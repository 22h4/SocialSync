import { headers } from 'next/headers';
import { getServerSession } from 'next-auth';
import HeaderNav from './HeaderNav';

export default async function Header() {
  // Force dynamic rendering
  headers();
  const session = await getServerSession();
  return <HeaderNav isAuthenticated={!!session} />;
} 