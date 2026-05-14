'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import DemoGenerator from '@/components/DemoGenerator';
import Quote from '@/components/Quote';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

function HomePageContent() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Force session reload when user returns from Stripe
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Always reload session on page load to catch any metadata updates from webhooks
      // This handles: returning from Stripe, returning from Clerk sign-in, or just refreshing
      const hasReloaded = sessionStorage.getItem('clerk_session_reloaded');
      
      if (!hasReloaded) {
        console.log('Reloading user session to get latest metadata...');
        user.reload().then(() => {
          console.log('Session reloaded, tier:', user.publicMetadata?.subscriptionTier);
          sessionStorage.setItem('clerk_session_reloaded', 'true');
        });
      }
    }
    
    // Clear the reload flag when user signs out or leaves
    return () => {
      if (!isSignedIn) {
        sessionStorage.removeItem('clerk_session_reloaded');
      }
    };
  }, [isLoaded, isSignedIn, user]);

  // Get subscription tier from user metadata
  const subscriptionTier = (user?.publicMetadata?.subscriptionTier as string) || 'free';

  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      
      {/* How it Works Section with Generator */}
      <section style={{
        padding: '100px 48px',
      }} id="how">
        <div style={{ maxWidth: '1200px', margin: 0 }}>
          <HowItWorks />

          {/* Real Working Generator */}
          {isLoaded && (
            <DemoGenerator 
              subscriptionTier={subscriptionTier} 
              isSignedIn={isSignedIn} 
            />
          )}
          
          {!isLoaded && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--muted)',
              fontSize: '14px',
            }}>
              Loading generator...
            </div>
          )}
        </div>
      </section>

      <Quote />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
