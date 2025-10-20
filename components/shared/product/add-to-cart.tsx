'use client';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { useRouter } from 'next/navigation';

const AddToCart = ({ item }: { item: CartItem }) => {
    const router = useRouter();

    const onAddToCartHandler = async () => {
        const res = await addItemToCart(item);

        if (!res.success) {
            toast.error('Failed add item to cart');
            return;
        }

        toast.success(
            <>
                <strong>{item.name}</strong><br/> added to cart
            </>,
            {
                action: (
                    <Button
                        className="bg-primary text-white hover:bg-gray-800 ml-2"
                        onClick={() => router.push('/cart')}
                    >
                        Go To Cart
                    </Button>
                ),
            }
        );
    };

    return (
        <Button className="w-full" onClick={onAddToCartHandler}>
            Add To Card
        </Button>
    );
};

export default AddToCart;
