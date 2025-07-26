"use client";

import { useAppContext } from "@/hooks/use-app-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ticket } from "lucide-react";

export default function BookingsPage() {
  const { t, isRTL } = useAppContext();
  const fontClass = isRTL ? 'font-vazir' : 'font-body';

  return (
    <div className={`container mx-auto px-4 py-8 text-center ${fontClass}`}>
      <div className="min-h-[calc(100vh-20rem)] flex flex-col items-center justify-center bg-card p-8 rounded-lg shadow-sm">
        <Ticket className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-2">{t('bookings.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('bookings.empty')}</p>
        <Button asChild>
          <Link href="/">{t('nav.home')}</Link>
        </Button>
      </div>
    </div>
  );
}
