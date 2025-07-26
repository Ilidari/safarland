
"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useAppContext } from "@/hooks/use-app-context";
import Logo from "./Logo";

export function Footer() {
  const { t } = useAppContext();

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-muted-foreground text-sm mt-4">
              {t('app.subtitle')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors text-sm">{t('footer.about')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm">{t('footer.careers')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm">{t('footer.press')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors text-sm">{t('footer.help')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm">{t('footer.contact')}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-sm">{t('footer.faq')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.social')}</h3>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Link href="#" className="text-muted-foreground icon-glow"><Instagram className="w-5 h-5"/></Link>
              <Link href="#" className="text-muted-foreground icon-glow"><Twitter className="w-5 h-5"/></Link>
              <Link href="#" className="text-muted-foreground icon-glow"><Facebook className="w-5 h-5"/></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {t('app.title')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
