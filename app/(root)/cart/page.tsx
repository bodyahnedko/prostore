import { Metadata } from 'next';
import React from 'react';
import CartTable from './cart-table';
import { getMyCart } from '@/lib/actions/cart.actions';

export const metadata: Metadata = {
    title: 'Shopping Cart',
};

const CartPage = async () => {
    const cart = await getMyCart();

    return (
        <div>
            <h1 className="py-4 h2-bold">Shopping cart</h1>
            <CartTable cart={cart} />
        </div>
    );
};

export default CartPage;
