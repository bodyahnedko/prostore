'use client';

import React, { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { signInWithCredentials } from '@/lib/actions/user.action';
import { useFormStatus } from 'react-dom';

const SignInForm = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state?.success) {
      router.replace('/');
    }
  }, [state?.success, router]);

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" disabled={pending} className="w-full" variant="default">
        {pending ? 'Signing in...' : 'Sign In'}
      </Button>
    );
  };

  return (
    <form action={formAction} className="space-y-3">
      <div className="space-y-5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
        <Label>Password</Label>
        <Input id="password" type="password" name="password" autoComplete="password" required />
        <SignInButton />
      </div>

      {!state?.success && <div className="text-center text-destructive">{state?.message}</div>}

      <div className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" target="_self" className="link text-yellow-500">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
