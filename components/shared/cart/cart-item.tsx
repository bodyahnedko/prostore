'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TableCell, TableRow } from '@/components/ui/table';
import AddRemoveItem from '@/components/shared/product/add-remove-item';
import { useCartActions } from '@/lib/hooks/use-cart-actions';
import { CartItem } from '@/types';

interface CartItemRowProps {
    item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
    const [isPending, startTransition] = useTransition();
    const { addToCart, removeFromCart } = useCartActions();

    const handleAddToCart = () => {
        startTransition(async () => {
            await addToCart(item);
        });
    };

    const handleRemoveFromCart = () => {
        startTransition(async () => {
            await removeFromCart(item);
        });
    };

    return (
        <TableRow key={item.slug}>
            <TableCell>
                <Link href={`/product/${item.slug}`} className="flex items-center">
                    <Image src={item.image} alt={item.name} width={50} height={50} />
                    <span className="px-2">{item.name}</span>
                </Link>
            </TableCell>
            <TableCell className="flex-center gap-2">
                <AddRemoveItem
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleAddToCart={handleAddToCart}
                    qty={item.qty}
                    isPending={isPending}
                />
            </TableCell>
            <TableCell className="text-right">${item.price}</TableCell>
        </TableRow>
    );
};

export default CartItemRow;
