'use client';

import { useUser } from '@clerk/nextjs';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import DemoGenerator from '@/components/DemoGenerator';
import Quote from '@/components/Quote';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();

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
