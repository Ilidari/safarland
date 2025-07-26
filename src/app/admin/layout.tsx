
"use client";
import { useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '@/hooks/use-app-context';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Users, BedDouble, Menu, Package2, LayoutDashboard } from 'lucide-react';
import { cn } from "@/lib/utils";
import Logo from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/signin');
    }
  }, [user, router]);
  
  const navLinks = [
    { href: "/admin", label: "داشبورد", icon: Home },
    { href: "/admin/users", label: "کاربران", icon: Users },
    { href: "/admin/hotels", label: "هتل‌ها", icon: BedDouble },
    { href: "/admin/homepage", label: "مدیریت صفحه اصلی", icon: LayoutDashboard },
  ];
  
  if (!user || !user.isAdmin) {
    return <div className="flex items-center justify-center h-screen">در حال بارگذاری...</div>;
  }

  return (
    <div className="grid min-h-[calc(100vh_-_5rem)] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="dark:text-primary">پنل ادمین</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:text-primary dark:text-foreground/60 dark:hover:text-primary",
                    pathname === link.href && "bg-muted text-primary dark:text-primary"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
         <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 md:hidden sticky top-0 z-40">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">باز کردن منوی ناوبری</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Logo />
                </Link>
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                        pathname === link.href && "bg-muted text-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
           <div className="w-full flex-1">
            <h1 className="font-semibold text-lg dark:text-primary">پنل ادمین</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
