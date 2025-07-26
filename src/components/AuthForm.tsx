"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppContext } from "@/hooks/use-app-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "./icons/GoogleIcon";

interface AuthFormProps {
  type: 'signin' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const { t, signIn } = useAppContext();
  const router = useRouter();

  const isSignUp = type === 'signup';

  const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  });

  const signUpSchema = signInSchema.extend({
    fullname: z.string().min(2, { message: "Full name is required." }),
  });

  const formSchema = isSignUp ? signUpSchema : signInSchema;

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isSignUp && { fullname: "" }),
    },
  });

  function onSubmit(values: FormValues) {
    signIn({
      email: values.email,
      name: isSignUp ? values.fullname : values.email.split('@')[0],
    });
    router.push('/');
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {isSignUp ? t('auth.signup') : t('auth.signin')}
        </CardTitle>
        <CardDescription>
          {isSignUp ? 'Create a new account to book your stay.' : 'Welcome back! Sign in to continue.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {isSignUp && (
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.fullname')}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
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
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isSignUp ? t('auth.signup_button') : t('auth.signin_button')}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t('auth.continue_with')}
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleIcon className="mr-2 h-4 w-4" />
          {t('auth.signin_with_google')}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
          {isSignUp ? t('auth.have_account') : t('auth.no_account')}
          {' '}
          <Link href={isSignUp ? '/signin' : '/signup'} className="text-primary hover:underline">
            {isSignUp ? t('nav.signin') : t('nav.signup')}
          </Link>
        </div>
        {!isSignUp && (
          <div className="text-center text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary hover:underline">
              {t('auth.forgot_password')}
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
