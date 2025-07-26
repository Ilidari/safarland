"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAppContext } from '@/hooks/use-app-context';
import Link from 'next/link';
import { Facebook, Eye, EyeOff } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function SignInPage() {
  const { t, signIn, isRTL } = useAppContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email === 'admin@ilishop.com' && values.password === 'Miladabi666@') {
      signIn({ email: values.email, name: 'Admin', isAdmin: true });
      router.push('/admin');
    } else {
      // Mock sign in for regular users
      signIn({ email: values.email, name: 'Test User', isAdmin: false });
      router.push('/');
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-10rem)] py-8 px-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">{t('signin.title')}</CardTitle>
          <CardDescription>{t('signin.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('signin.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('signin.password')}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} className={cn(isRTL ? 'pl-10' : 'pr-10')} />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn("absolute inset-y-0 flex items-center text-muted-foreground", isRTL ? "left-3" : "right-3")}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">{t('nav.signin')}</Button>
            </form>
          </Form>

          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t('auth.continue_with')}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <GoogleIcon />
              Google
            </Button>
            <Button variant="outline" className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white">
              <Facebook className="text-white" />
              Facebook
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('signin.no_account')} <Link href="/signup" className="text-primary hover:underline font-semibold">{t('nav.signup')}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
