
"use client";

import { useAppContext } from "@/hooks/use-app-context";
import Link from "next/link";

export default function Logo() {
  const { t } = useAppContext();
  return (
    <Link href="/" className="flex flex-col items-center group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="60"
        viewBox="0 0 100 120"
        className="group-hover:scale-105 transition-transform duration-300"
      >
        <g className="fill-primary group-hover:fill-accent transition-colors duration-300">
          <path d="M50 10C55 20 70 30 60 45C50 35 40 25 50 10Z" />
          <path d="M50 10C45 20 30 30 40 45C50 35 60 25 50 10Z" />
          <path d="M50 15C50 20 52 28 50 35C48 28 50 20 50 15Z" />

          <circle cx="20" cy="80" r="4" />
          <path d="M16 85 Q20 95 24 85" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="stroke-primary group-hover:stroke-accent transition-colors duration-300" />
          
          <circle cx="50" cy="70" r="5" />
          <path d="M45 75 Q50 90 55 75" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="stroke-primary group-hover:stroke-accent transition-colors duration-300" />

          <circle cx="80" cy="80" r="4" />
          <path d="M76 85 Q80 95 84 85" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="stroke-primary group-hover:stroke-accent transition-colors duration-300" />
        </g>
      </svg>

      <p className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
        {t('app.title')}
      </p>
    </Link>
  );
}
