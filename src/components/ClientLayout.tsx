"use client";

import { useAppContext } from "@/hooks/use-app-context";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isRTL } = useAppContext();
  const fontClass = isRTL ? 'font-vazir' : 'font-body';

  return (
      <div className={`${fontClass} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </div>
  )
}
