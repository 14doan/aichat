'use client';
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

export function SessionProvider({ session, children }: Props) {
  return <Provider>{children}</Provider>;
}
