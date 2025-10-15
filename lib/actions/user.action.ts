'use server';

import { signInFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';

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

export async function signOutUser(): Promise<{ success: boolean; message?: string }> {
  try {
    await signOut({ redirect: false });

    return { success: true };
  } catch (error: unknown) {
    console.error(error);

    return {
      success: false,
      message: 'Sign out failed',
    };
  }
}
