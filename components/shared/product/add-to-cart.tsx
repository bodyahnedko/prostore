'use client';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Cart, CartItem } from '@/types';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useRouter } from 'next/navigation';
import { Loader, Minus, Plus } from 'lucide-react';

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        startTransition(async () => {
            const res = await addItemToCart(item);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success(res.message, {
                action: (
                    <Button
                        className="bg-primary text-white hover:bg-gray-800 ml-2"
                        onClick={() => router.push('/cart')}
                    >
                        Go To Cart
                    </Button>
                ),
            });
        });
    };

    const handleRemoveFromCart = () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            const makeToast = res.success ? toast.success : toast.error;

            makeToast(res.message);
        });
    };

    const existCartItem = cart && cart.items.find((x) => x.productId === item.productId);

    return existCartItem ? (
        <div className='flex items-center justify-center'>
            <Button type="button" variant={'outline'} onClick={handleRemoveFromCart} disabled={isPending}>
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Minus className="h-4 w-4" />}
            </Button>
            <span className="px-2">{isPending ? <Loader className="w-4 h-4 animate-spin" /> : existCartItem.qty}</span>
            <Button type="button" variant={'outline'} onClick={handleAddToCart} disabled={isPending}>
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button>
        </div>
    ) : (
        <Button className="w-full" onClick={handleAddToCart} disabled={isPending}>
            {isPending ? <Loader className="w-4 h-4 animate-spin" /> : 'Add To Card'}
        </Button>
    );
};

export default AddToCart;
