'use client';

import Script from 'next/script';

export default function CTA() {
  return (
    <>
      <Script src="https://subscribe-forms.beehiiv.com/embed.js" strategy="afterInteractive" />
      
      <section style={{
        padding: '100px 48px',
        background: 'var(--paper2)',
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }} id="waitlist-bottom">
        <div style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '16px',
        }}>Early access</div>
        
        <h2 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 700,
          lineHeight: 1.12,
          color: 'var(--ink)',
          textAlign: 'center',
          margin: '0 auto 16px',
        }}>Founding member pricing — first 200 only.</h2>
        
        <p style={{
          fontSize: '15px',
          color: 'var(--muted)',
          maxWidth: '440px',
          marginBottom: '36px',
          fontWeight: 300,
        }}>
          The first 200 people to sign up get founding member pricing — $9/month Solo, locked in forever. That's half price, permanently, just for being early. We'll email you when the product is ready.
        </p>

        <div style={{ width: '100%', maxWidth: '480px' }}>
          <iframe 
            src="https://subscribe-forms.beehiiv.com/a2d269dc-d5a4-4936-a232-458edf41f966" 
            data-test-id="beehiiv-embed" 
            frameBorder="0"
            scrolling="no"
            style={{
              width: '100%',
              height: '315px',
              margin: 0,
              borderRadius: '8px',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              maxWidth: '100%',
              border: 'none',
            }}
          ></iframe>
        </div>
        
        <p style={{
          fontSize: '11px',
          color: 'var(--dim)',
          marginTop: '8px',
          letterSpacing: '0.02em',
        }}>
          No credit card now. We'll email you when it's ready with your founding member link. Founding pricing closes at 200 signups.
        </p>
      </section>
    </>
  );
}
