export default function Footer() {
  return (
    <footer style={{
      padding: '48px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
        Specs, simplified. · © 2026
      </div>
      
      <div style={{
        display: 'flex',
        gap: '24px',
      }}>
        <a
          href="#"
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
          href="#"
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
          href="#"
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
