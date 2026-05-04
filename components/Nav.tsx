export default function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 48px',
      background: 'rgba(245,242,236,0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      zIndex: 100,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
      }}>
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: '24px',
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

      <div style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
      }}>
        <a
          href="#how"
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 400,
            letterSpacing: '0.03em',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          How it works
        </a>
        <a
          href="#pricing"
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            textDecoration: 'none',
            fontWeight: 400,
            letterSpacing: '0.03em',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}
        >
          Pricing
        </a>
        <a
          href="#waitlist"
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
        </a>
      </div>
    </nav>
  );
}
