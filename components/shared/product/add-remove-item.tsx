"use client"
import { Button } from '@/components/ui/button';
import { Loader, Minus, Plus } from 'lucide-react';
import React from 'react';

type Props = {
    isPending: boolean;
    handleRemoveFromCart: () => void;
    handleAddToCart: () => void;
    qty: number;
};

const AddRemoveItem = ({ isPending, handleAddToCart, handleRemoveFromCart, qty }: Props) => {
    return (
        <div className="flex items-center justify-center">
            <Button type="button" variant={'outline'} onClick={handleRemoveFromCart} disabled={isPending}>
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Minus className="h-4 w-4" />}
            </Button>
            <span className="px-2 w-9 text-center">{isPending ? <Loader className="w-4 h-4 animate-spin" /> : qty}</span>
            <Button type="button" variant={'outline'} onClick={handleAddToCart} disabled={isPending}>
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button>
        </div>
    );
};

export default AddRemoveItem;
