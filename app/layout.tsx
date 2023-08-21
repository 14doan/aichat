import ClientProvider from '@/components/ClientProvider';
import Login from '@/components/Login';
import { SessionProvider } from '@/components/SessionProvider';
import Sidebar from '@/components/Sidebar';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '../pages//api/auth/[...nextauth]';
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* sidebar */}
              <div className=" bg-slate-50 h-screen max-w-xs md:min-w-[18rem] overflow-y-auto">
                <Sidebar />
              </div>

              {/* client provider-notification-ai is thinking */}
              <ClientProvider />
              <div className="flex-1 bg-slate-200">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
