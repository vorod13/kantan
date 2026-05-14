'use client';

import Script from 'next/script';
import { useResponsive } from '@/app/hooks/useResponsive';

export default function Hero() {
  const { isMobile, isSmallMobile } = useResponsive();

  return (
    <>
      <Script src="https://subscribe-forms.beehiiv.com/embed.js" strategy="afterInteractive" />
      
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: isMobile ? '90px 20px 48px' : '160px 48px 100px',
        position: 'relative',
      }} id="main-content">
        {/* Large Japanese characters background */}
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: isMobile ? 'clamp(72px, 18vw, 120px)' : 'clamp(180px, 24vw, 280px)',
          fontWeight: 800,
          lineHeight: 0.9,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(13,13,13,0.12)',
          position: 'absolute',
          right: isMobile ? '-8px' : '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.02em',
          opacity: isMobile ? 0.08 : 1,
        }}>
          簡<br/>単
        </div>

        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '28px',
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
          For product managers
        </div>

        <h1 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: isMobile ? '36px' : 'clamp(42px, 6vw, 80px)',
          fontWeight: 700,
          lineHeight: 1.08,
          color: 'var(--ink)',
          maxWidth: '680px',
          marginBottom: '24px',
        }}>
          Stop writing specs.<br/>
          Start shipping <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>product.</em>
        </h1>

        <p style={{
          fontSize: isMobile ? '15px' : '17px',
          color: 'var(--muted)',
          maxWidth: '480px',
          lineHeight: 1.65,
          marginBottom: '48px',
          fontWeight: 300,
        }}>
          Kantan turns a rough idea into a prioritized, formatted user story with acceptance criteria in seconds — so you can spend your time on the work that actually matters.
        </p>

        {/* Beehiiv Waitlist Form */}
        <div id="waitlist">
          <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '480px' }}>
            <iframe 
              src="https://subscribe-forms.beehiiv.com/a2d269dc-d5a4-4936-a232-458edf41f966"
              className="beehiiv-embed"
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
        </div>

        <p style={{
          fontSize: '11px',
          color: 'var(--dim)',
          marginTop: '12px',
          letterSpacing: '0.02em',
        }}>
          First 200 signups get founding member pricing — $9/month forever. No credit card now.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '40px',
          marginTop: '64px',
          paddingTop: isMobile ? '28px' : '40px',
          borderTop: '1px solid var(--border)',
        }}>
          <div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: isSmallMobile ? '26px' : '32px',
              fontWeight: 700,
              color: 'var(--ink)',
            }}>~45 min</div>
            <div style={{
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>Avg time to write a good user story</div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: isSmallMobile ? '26px' : '32px',
              fontWeight: 700,
              color: 'var(--ink)',
            }}>&lt; 30 sec</div>
            <div style={{
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>With Kantan</div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: isSmallMobile ? '26px' : '32px',
              fontWeight: 700,
              color: 'var(--ink)',
            }}>10×</div>
            <div style={{
              fontSize: '11px',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>More time for actual product thinking</div>
          </div>
        </div>
      </section>
    </>
  );
}
