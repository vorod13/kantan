'use client';

import { useResponsive } from '@/app/hooks/useResponsive';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Nav() {
  const { isMobile, isSmallMobile } = useResponsive();
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isSmallMobile ? '12px 16px' : isMobile ? '14px 20px' : '20px 48px',
      background: 'rgba(245,242,236,0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      zIndex: 100,
    }}>
      {/* Logo - clickable if not on homepage */}
      {isHomepage ? (
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
        }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: isMobile ? '18px' : '24px',
            fontWeight: 700,
            color: 'var(--ink)',
          }}>
            かんたん
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Kantan
          </div>
        </div>
      ) : (
        <Link 
          href="/"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: isMobile ? '18px' : '24px',
            fontWeight: 700,
            color: 'var(--ink)',
          }}>
            かんたん
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Kantan
          </div>
        </Link>
      )}

      <div style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
      }}>
        <Link
          href="/about"
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 400,
            letterSpacing: '0.03em',
            transition: 'color 0.2s',
            display: isMobile ? 'none' : 'inline-block',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          About
        </Link>
        <Link
          href={isHomepage ? "#pricing" : "/#pricing"}
          scroll={true}
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 400,
            letterSpacing: '0.03em',
            transition: 'color 0.2s',
            display: isMobile ? 'none' : 'inline-block',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          Pricing
        </Link>
        <Link
          href={isHomepage ? "#waitlist" : "/#waitlist"}
          scroll={true}
          style={{
            fontSize: '13px',
            color: 'var(--white)',
            background: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: 500,
            letterSpacing: '0.04em',
            padding: '8px 20px',
            borderRadius: '4px',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--accentL)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent)'}
        >
          Get founding pricing
        </Link>
      </div>
    </nav>
  );
}
