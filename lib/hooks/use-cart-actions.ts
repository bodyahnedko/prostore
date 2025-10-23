'use client';

import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';

export const useCartActions = () => {
    const addToCart = async (item: CartItem) => {
        try {
            await addItemToCart(item);
            toast.success(`Item ${item.name} added to cart`);
        } catch (error) {
            toast.error('Failed to add item to cart');
            console.error('Add to cart error:', error);
        }
    };

    const removeFromCart = async (item: CartItem) => {
        try {
            await removeItemFromCart(item.productId);
            toast.success(`Item ${item.name} removed from cart`);
        } catch (error) {
            toast.error('Failed to remove item from cart');
            console.error('Remove from cart error:', error);
        }
    };

    return {
        addToCart,
        removeFromCart,
    };
};
