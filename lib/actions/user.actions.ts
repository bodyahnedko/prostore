'use server';

import { hashSync } from 'bcrypt-ts-edge';
import { paymentMethodSchema, shippingAddressSchema, signInFormSchema, signUpFormSchema } from '../validators';
import { auth, signIn, signOut } from '@/auth';
import { prisma } from '@/db/prisma';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { formatError } from '../utils';
import { ShippingAddress } from '@/types';
import z from 'zod';

type SignInResult = {
    success: boolean;
    message?: string;
};

export async function signInWithCredentials(prevState: SignInResult, formData: FormData): Promise<SignInResult> {
    const values = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const parse = signInFormSchema.safeParse(values);

    if (!parse.success) {
        return {
            success: false,
            message: parse.error.errors[0]?.message || 'Invalid input',
        };
    }

    try {
        const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (res && (res as any).error) {
            return {
                success: false,
                message: 'Invalid email or password',
            };
        }

        return {
            success: true,
        };
    } catch (error: unknown) {
        console.error(error);
        return {
            success: false,
            message: 'Invalid email or password',
        };
    }
}

export async function signOutUser() {
    await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password;

        user.password = hashSync(user.password, 10);

        debugger;

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
            redirect: false,
        });

        return {
            success: true,
            message: 'User registered successfully',
        };
    } catch (error) {
        console.error(error);

        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false,
            message: formatError(error),
        };
    }
}

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
    });

    if (!user) throw new Error('User not found');

    return user;
};

export async function updateUserAddress(data: ShippingAddress) {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id,
            },
        });

        if (!currentUser) throw new Error('User not found');

        const address = shippingAddressSchema.parse(data);

        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                address,
            },
        });

        return {
            success: true,
            message: 'User updated successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}

export const updatePaymentMethod = async (data: z.infer<typeof paymentMethodSchema>) => {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id,
            },
        });

        if (!currentUser) throw new Error('User not found');

        const paymentMethod = paymentMethodSchema.parse(data);

        await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                paymentMethod: paymentMethod.type,
            },
        });

        return {
            success: true,
            message: 'User updated successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
};
