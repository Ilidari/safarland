"use client";

import { AuthForm } from "@/components/AuthForm";
import { useAppContext } from "@/hooks/use-app-context";

export default function SignUpPage() {
    const { isRTL } = useAppContext();
    const fontClass = isRTL ? 'font-vazir' : 'font-body';

  return (
    <div className={`flex min-h-[calc(100vh-13rem)] items-center justify-center p-4 ${fontClass}`}>
      <AuthForm type="signup" />
    </div>
  );
}
