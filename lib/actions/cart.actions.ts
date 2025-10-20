'use server';

import { cookies } from 'next/headers';
import { convertToPlainObject, formatError } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { CartItem } from '@/types';
import { cartItemsSchema } from '../validators';

export const addItemToCart = async (data: CartItem) => {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('Cart session not found');

        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        const cart = await getMyCart();

        const item = cartItemsSchema.parse(data);

        const product = await prisma.product.findFirst({
            where: {
                id: item.productId,
            },
        });

        console.log({
            'Session Cart ID': sessionCartId,
            'User ID': userId,
            'Item requested': item,
            'Item found': product,
        });

        return {
            success: true,
            message: 'Successfully added to cart!',
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: formatError(error),
        };
    }
};

export async function getMyCart() {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart session not found');

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await prisma.cart.findFirst({
        where: userId ? { userId } : { sessionCartId },
    });

    if (!cart) return undefined;

    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    });
}
