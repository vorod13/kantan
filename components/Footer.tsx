'use client';

import { useResponsive } from '@/app/hooks/useResponsive';

export default function Footer() {
  const { isMobile } = useResponsive();

  return (
    <footer style={{
      padding: isMobile ? '32px 20px' : '48px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '16px' : '0',
      textAlign: isMobile ? 'center' : 'left',
    }}>
      <div style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--ink)',
      }}>
        かんたん &nbsp;·&nbsp; Kantan
      </div>
      
      <div style={{
        fontSize: '12px',
        color: 'var(--dim)',
      }}>
       Kantan Labs LLC ©  ·  2026
      </div>
      
      <div style={{
        display: 'flex',
        gap: '24px',
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}>
        <a
          href="/privacy"
          style={{
            fontSize: '12px',
            color: 'var(--dim)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--muted)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}
        >
          Privacy
        </a>
        <a
          href="/terms"
          style={{
            fontSize: '12px',
            color: 'var(--dim)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--muted)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}
        >
          Terms
        </a>
        <a
          href="mailto:hello@kantanlabs.com"
          style={{
            fontSize: '12px',
            color: 'var(--dim)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--muted)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--dim)'}
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
