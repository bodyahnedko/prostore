'use client';
import React, { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Cart, CartItem } from '@/types';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import AddRemoveItem from './add-remove-item';

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
        <AddRemoveItem
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddToCart={handleAddToCart}
            qty={existCartItem.qty}
            isPending={isPending}
        />
    ) : (
        <Button className="w-full" onClick={handleAddToCart} disabled={isPending}>
            {isPending ? <Loader className="w-4 h-4 animate-spin" /> : 'Add To Card'}
        </Button>
    );
};

export default AddToCart;
