'use client';

import { useResponsive } from '@/app/hooks/useResponsive';
import EmailSignupForm from '@/components/EmailSignupForm';

export default function Hero() {
  const { isMobile } = useResponsive();

  return (
    <>
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '90px 20px 48px' : '120px 48px 100px',
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
          zIndex: 0,
        }}>
          簡<br/>単
        </div>

        {/* Two-Column Layout (Desktop) / Stacked (Mobile) */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '48px' : '80px',
          maxWidth: '1200px',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}>
          
          {/* Left Column: Text Content */}
          <div style={{
            flex: isMobile ? '1' : '1 1 60%',
            maxWidth: isMobile ? '100%' : '680px',
          }}>
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
              fontSize: isMobile ? '36px' : 'clamp(42px, 6vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.08,
              color: 'var(--ink)',
              marginBottom: '24px',
            }}>
              Stop writing specs.<br/>
              Start shipping <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>product.</em>
            </h1>

            <p style={{
              fontSize: isMobile ? '15px' : '17px',
              color: 'var(--muted)',
              lineHeight: 1.65,
              fontWeight: 300,
            }}>
              Kantan turns a rough idea into a prioritized, formatted user story with acceptance criteria in seconds — so you can spend your time on the work that actually matters.
            </p>
          </div>

          {/* Right Column: Email Form */}
          <div style={{
            flex: isMobile ? '1' : '1 1 35%',
            maxWidth: isMobile ? '100%' : '380px',
          }} id="waitlist">
            <EmailSignupForm />
          </div>
        </div>
      </section>
    </>
  );
}
