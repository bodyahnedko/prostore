'use client';

import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} height={48} width={48} priority />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-destructive">Couldn't find requested page</p>
        <Button variant={'outline'} className="mt-5" onClick={() => (window.location.href = '/')}>
          Back To home
        </Button>
      </div>
    </div>
  );
};

export default Notfound;
