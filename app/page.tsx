'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import DemoGenerator from '@/components/DemoGenerator';
import Pricing from '@/components/Pricing';
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
      
      {/* Generator Section - Inside Hero Flow */}
		<section style={{
		  padding: '0px 48px 100px',
		  background: 'var(--paper)',
		}} id="generator">
		  <div style={{ maxWidth: '1200px' }}>
			{/* Eyebrow */}
			<div style={{
			  fontSize: '11px',
			  fontWeight: 500,
			  letterSpacing: '0.2em',
			  textTransform: 'uppercase',
			  color: 'var(--accent)',
			  marginBottom: '32px',
			  display: 'flex',
			  alignItems: 'center',
			  gap: '10px',
			}}>
			  <span style={{
				display: 'block',
				width: '32px',
				height: '1px',
				background: 'var(--accent)',
			  }}></span>
			  Write your story
			</div>

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

      <Pricing />
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
