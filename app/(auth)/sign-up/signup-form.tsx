'use client';

import React, { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useFormStatus } from 'react-dom';
import { signUpUser } from '@/lib/actions/user.action';
import Link from 'next/link';

const SignUpForm = ({ callbackUrl = '/' }: { callbackUrl?: string }) => {
    const router = useRouter();
    const [state, formAction] = useActionState(signUpUser, {
        success: false,
        message: '',
    });

    useEffect(() => {
        if (state?.success) {
            router.replace(callbackUrl || '/');
        }
    }, [state?.success, router, callbackUrl]);

    console.log('1111111111111111111111111 state', state)

    const SignUpButton = () => {
        const { pending } = useFormStatus();

        return (
            <Button type="submit" disabled={pending} className="w-full" variant="default">
                {pending ? 'Submitting' : 'Sign Up'}
            </Button>
        );
    };

    return (
        <form action={formAction} className="space-y-3">
            <input type="hidden" name="callbackUrl" value={callbackUrl || '/'} />
            <div className="space-y-5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" autoComplete="name"  />
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email"  />
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" autoComplete="password" required />
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    type="confirmPassword"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    required
                />
                <SignUpButton />
            </div>

            {!state?.success && <div className="text-center text-destructive">{state?.message}</div>}

            <div className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link href="/sign-in" target="_self" className="link text-yellow-500">
                    Sign In
                </Link>
            </div>
        </form>
    );
};

export default SignUpForm;
