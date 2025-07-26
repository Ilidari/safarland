"use client";
import { useAppContext } from '@/hooks/use-app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';

export default function BookingsPage() {
  const { t, user } = useAppContext();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 font-headline">{t('bookings.title')}</h1>
      {user ? (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Ticket className="text-primary"/>
              {t('bookings.your_bookings')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('bookings.no_bookings')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-16 border rounded-lg">
            <p className="text-muted-foreground mb-4">{t('bookings.not_logged_in')}</p>
            <Button asChild>
                <Link href="/signin">{t('nav.signin')}</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
