'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </SessionProvider>
  );
};

export default Providers;
