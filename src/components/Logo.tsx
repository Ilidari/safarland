"use client";

import { useAppContext } from "@/hooks/use-app-context";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
    showText?: boolean;
}

export default function Logo({ showText = false }: LogoProps) {
  const { t, isRTL } = useAppContext();

  return (
    <Link href="/" className="group">
        <div className="flex flex-col items-center p-4 transition-all duration-300">
            {/* The container for the image with a fixed size */}
            <div className={cn("transition-all duration-300 w-24 h-24" )}>
                <Image 
                    src="/images/safarland-logo.png" 
                    alt="Safarland Logo" 
                    width={120}
                    height={120}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            {/* The container for the text that will be shown/hidden */}
            <div className={cn(
                "text-center transition-all duration-300",
                 showText ? "opacity-100 -mt-4" : "opacity-0 h-0 invisible"
            )}>
                <h2 className={cn("font-bold text-xl text-muted-foreground", isRTL ? "font-vazir" : "font-headline")}>
                    {isRTL || t('app.title') === 'سفرلند' ? 'سفرلند' : 'SAFARLAND'}
                </h2>
            </div>
        </div>
    </Link>
  );
}
