import { ReactNode } from 'react';

import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

export type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-dvh max-h-dvh min-h-dvh">
      <Navbar />
      <div className="grid grid-cols-1 grid-rows-[1fr_auto] justify-items-center p-0 w-full h-full max-h-full overflow-y-auto">
        <main className="w-full px-2 py-8 md:p-8 2xl:px-0 max-w-8xl relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
