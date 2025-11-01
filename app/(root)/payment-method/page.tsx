import { auth } from '@/auth';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import React from 'react';
import PaymentMethodForm from './payment-method-form';

export const metadata: Metadata = {
    title: 'Select Payment Method',
};

const PaymentMethodPage = async () => {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) throw new Error('No user ID');

    const user = await getUserById(userId);

    return (
        <div>
            <CheckoutSteps current={2} />
            <PaymentMethodForm paymentMethod={user.paymentMethod as string} />
        </div>
    );
};

export default PaymentMethodPage;
