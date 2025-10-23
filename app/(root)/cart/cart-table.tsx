'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { Cart } from '@/types';
import { ArrowRight, Loader } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import CartItemRow from '@/components/shared/cart/cart-item';

const CartTable = ({ cart }: { cart?: Cart }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <>
            {!cart || cart.items.length === 0 ? (
                <div>
                    Cart is empty. <Link href={'/'}>Go Shopping</Link>
                </div>
            ) : (
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
                                    <CartItemRow key={item.slug} item={item} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Card className='p-0'>
                        <CardContent className="p-4 gap-4">
                            <div className="pb-3 text-xl">
                                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}){' '}
                                <span className="font-bold">{formatCurrency(cart.itemsPrice)}</span>
                            </div>

                            <Button
                                className="w-full"
                                disabled={isPending}
                                onClick={() => {
                                    startTransition(() => router.push('/shipping-address'));
                                }}
                            >
                                {isPending ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )}{' '}
                                Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
};

export default CartTable;
