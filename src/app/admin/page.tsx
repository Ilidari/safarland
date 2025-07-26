
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from '@/hooks/use-app-context';
import { Users, BedDouble, BarChart } from 'lucide-react';

export default function AdminDashboardPage() {
  const { t } = useAppContext();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 font-headline dark:text-primary">داشبورد</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-primary/80">تعداد کل کاربران</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-muted-foreground invisible">...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-primary/80">تعداد کل هتل‌ها</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-muted-foreground invisible">...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-primary/80">تعداد کل رزروها</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-muted-foreground invisible">...</p>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="dark:text-primary">فعالیت‌های اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">فعالیت اخیر برای نمایش وجود ندارد.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
