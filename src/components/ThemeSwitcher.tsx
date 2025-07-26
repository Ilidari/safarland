"use client";

import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/use-app-context';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-foreground icon-glow rounded-full"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
