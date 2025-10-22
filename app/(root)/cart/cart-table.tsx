'use client';
import AddRemoveItem from '@/components/shared/product/add-remove-item';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Cart, CartItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

const CartTable = ({ cart }: { cart?: Cart }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = (item: CartItem) => {
        startTransition(async () => {
            const res = await addItemToCart(item);

            if (!res.success) {
                toast.error(res.message);
            }
        });
    };

    const handleRemoveFromCart = (item: CartItem) => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            if (!res.success) {
                toast.error(res.message);
            }
        });
    };

    return (
        <>
            {!cart || cart.items.length === 0 ? (
                <div>
                    Cart is empty. <Link href={'/'}>Go Shopping</Link>
                </div>
            ) : (
                <div>
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-center">Quantity</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.items.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell>
                                                <Link href={`/product/${item.slug}`} className="flex items-center">
                                                    <Image src={item.image} alt={item.name} width={50} height={50} />
                                                    <span className="px-2">{item.name}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="flex-center gap-2">
                                                <AddRemoveItem
                                                    handleRemoveFromCart={() => handleRemoveFromCart(item)}
                                                    handleAddToCart={() => handleAddToCart(item)}
                                                    qty={item.qty}
                                                    isPending={isPending}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">${item.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartTable;
