import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SignUpForm from './signup-form';

export const metadata: Metadata = {
    title: "Sign Up"
}

const SingUpPage = async (props: { searchParams: Promise<{ callbackUrl?: string }> }) => {
    const { callbackUrl } = await props.searchParams;

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href="/" className="flex-center">
                        <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} width={100} height={100} priority />
                    </Link>
                    <CardTitle className="text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">Enter your information below to sign up</CardDescription>
                    <CardContent><SignUpForm callbackUrl={callbackUrl} /></CardContent>
                </CardHeader>
            </Card>
        </div>
    );
};

export default SingUpPage;
