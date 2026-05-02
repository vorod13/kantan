'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to /demo after verification
    router.push('/demo');
  }, [router]);
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--paper)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <p style={{ color: 'var(--muted)' }}>Verifying your email...</p>
    </div>
  );
}
