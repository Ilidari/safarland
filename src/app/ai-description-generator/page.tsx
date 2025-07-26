"use client";

import { AIGeneratorForm } from "@/components/AIGeneratorForm";
import { useAppContext } from "@/hooks/use-app-context";

export default function AiGeneratorPage() {
    const { isRTL } = useAppContext();
    const fontClass = isRTL ? 'font-vazir' : 'font-body';

  return (
    <div className={`container mx-auto px-4 py-8 ${fontClass}`}>
      <div className="max-w-2xl mx-auto">
        <AIGeneratorForm />
      </div>
    </div>
  );
}
