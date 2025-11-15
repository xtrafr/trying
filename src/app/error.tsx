'use client';

import { useEffect } from 'react';
import Button from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gradient mb-4">Oops!</h1>
        <h2 className="text-2xl font-bold text-text mb-4">Something went wrong</h2>
        <p className="text-text-secondary mb-8">
          An error occurred while loading this page. Don&apos;t worry, we&apos;re on it.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" href="/">Go Home</Button>
        </div>
      </div>
    </div>
  );
}
