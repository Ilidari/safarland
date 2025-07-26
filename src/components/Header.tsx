"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, LogIn, User, Home, Wand2, Ticket, UserPlus, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/hooks/use-app-context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export function Header() {
  const { t, user, signOut } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: <Home className="h-5 w-5" /> },
    { href: "/bookings", label: t("nav.bookings"), auth: true, icon: <Ticket className="h-5 w-5" /> },
    { href: "/ai-description-generator", label: t("nav.ai_generator"), icon: <Wand2 className="h-5 w-5" /> },
  ];

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <header className="bg-card/80 text-card-foreground backdrop-blur-md sticky top-0 z-50 shadow-sm border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="hidden md:block">
            <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map(
            (link) =>
              (!link.auth || user) && (
                <Button asChild variant="ghost" size="icon" className="icon-glow rounded-full" key={link.href}>
                  <Link
                    href={link.href}
                    title={link.label}
                  >
                    {link.icon}
                  </Link>
                </Button>
              )
          )}
        
          <ThemeSwitcher />
          <LanguageSwitcher />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="icon-glow group rounded-full">
                  <Avatar className="h-8 w-8 border-2 border-transparent group-hover:border-primary/50 transition-all">
                     <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback className="bg-transparent text-sm font-bold">
                          {getInitials(user.name)}
                      </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                      <span>{t("nav.signout")}</span>
                    </DropdownMenuItem>
                  </>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <div className="flex items-center gap-2">
                <Link href="/signin" className={cn(
                    "relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-foreground rounded-full group",
                    "bg-gradient-to-br from-primary via-accent to-accent-foreground group-hover:from-primary group-hover:via-accent group-hover:to-accent-foreground",
                    "focus:ring-4 focus:outline-none focus:ring-primary/50",
                    "transition-all duration-300 ease-in-out",
                    "group-hover:animate-button-glow"
                  )}>
                     <span className={cn(
                       "relative px-4 py-2 transition-all ease-in duration-150 bg-card rounded-full",
                       "group-hover:bg-accent dark:group-hover:bg-primary",
                       "flex items-center gap-2 rtl:flex-row-reverse"
                     )}>
                        <span className="relative flex items-center gap-2 group-hover:text-primary-foreground">
                            <LogIn className="h-5 w-5" />
                            <span>{t('nav.signin')}</span>
                        </span>
                    </span>
                </Link>
             </div>
          )}
        </div>
        
        <div className="md:hidden flex-1 flex justify-start">
             <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
        </div>
        <div className="md:hidden flex-1 flex justify-center">
            <Logo />
        </div>
        <div className="md:hidden flex-1" />

      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 p-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map(
              (link) =>
                (!link.auth || user) && (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-base font-medium transition-colors hover:text-primary p-2 rounded-md"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                )
            )}
            <div className="border-t border-border/20 pt-4">
              {user ? (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                     <Avatar className="h-10 w-10 border-2 border-primary/50">
                       <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback className="bg-transparent text-lg font-bold">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-base font-medium leading-none">{user.name}</p>
                        <p className="text-sm leading-none text-muted-foreground">
                          {user.email}
                        </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="secondary"
                    className="w-full"
                  >
                    {t("nav.signout")}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                   <Button asChild variant="ghost" size="sm" className="w-full justify-start text-base p-2 h-auto hover:text-primary hover:bg-transparent">
                    <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>{t("nav.signin")}</Link>

                  </Button>
                  <Button asChild size="sm" className="w-full text-base py-2 h-auto">
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>{t("nav.signup")}</Link>
                  </Button>
                </div>
              )}
            </div>
             <div className="border-t border-border/20 pt-4 flex justify-center items-center gap-4">
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
