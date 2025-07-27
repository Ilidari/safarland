
"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Info, Briefcase, Newspaper, LifeBuoy, Phone, HelpCircle } from "lucide-react";
import { useAppContext } from "@/hooks/use-app-context";
import Logo from "./Logo";

export function Footer() {
  const { t } = useAppContext();

  const footerLinks = [
    { href: "#", text: t('footer.about'), icon: Info },
    { href: "#", text: t('footer.careers'), icon: Briefcase },
    { href: "#", text: t('footer.press'), icon: Newspaper },
    { href: "#", text: t('footer.help'), icon: LifeBuoy },
    { href: "#", text: t('footer.faq'), icon: HelpCircle },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t">
       {/* 
        * 1. The overall WIDTH of the footer content is controlled by `max-w-4xl`. 
        *    You can change it to `max-w-3xl` (narrower) or `max-w-5xl` (wider).
        * 
        * 2. The vertical HEIGHT of the footer is controlled by `py-4`.
        *    You can change it to `py-2` (shorter) or `py-8` (taller).
        */}
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex flex-col items-center text-center gap-2">
          
          <div>
            <Logo showText={true} />
            <p className="text-muted-foreground text-sm max-w-xs mx-auto -mt-2">
              {t('app.subtitle')}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
             {footerLinks.map((link, index) => (
                <Link key={index} href={link.href} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <link.icon className="w-4 h-4" />
                  <span>{link.text}</span>
                </Link>
            ))}
          </nav>
          
          <div className="flex space-x-6 rtl:space-x-reverse">
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5"/></Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5"/></Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5"/></Link>
          </div>
          
          <div className="w-full border-t border-border/50 pt-2 mt-2">
            <p className="text-muted-foreground text-xs">&copy; {new Date().getFullYear()} {t('app.title')}. {t('footer.rights')}</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
