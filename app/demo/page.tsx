'use client';

import { useUser } from '@clerk/nextjs';
import DemoGenerator from '@/components/DemoGenerator';

export default function DemoPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--paper)',
      }}>
        <p style={{ color: 'var(--muted)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</p>
      </div>
    );
  }

  // Get subscription tier from user metadata
  const subscriptionTier = (user?.publicMetadata?.subscriptionTier as string) || 'free';

  // Render generator in standalone page layout
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      padding: '40px 20px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <DemoGenerator subscriptionTier={subscriptionTier} isSignedIn={isSignedIn} />
    </div>
  );
}
