'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FactorOnePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect back to /demo 
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
      <p style={{ color: 'var(--muted)' }}>Processing...</p>
    </div>
  );
}
