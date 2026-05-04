export default function Problem() {
  return (
    <section style={{
      padding: '100px 48px',
      background: 'var(--paper2)',
    }}>
      <div style={{ maxWidth: '1200px', margin: 0 }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '16px',
        }}>The problem</div>
        
        <h2 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 700,
          lineHeight: 1.12,
          color: 'var(--ink)',
          maxWidth: '640px',
          marginBottom: '20px',
        }}>Writing specs shouldn't be the job.</h2>
        
        <p style={{
          fontSize: '15px',
          color: 'var(--muted)',
          maxWidth: '520px',
          fontWeight: 300,
        }}>
          Every PM knows the pain. You have a clear vision in your head, but turning it into a properly structured story with sharp AC, the right format, and a defensible priority score takes forever.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginTop: '56px',
          maxWidth: '900px',
        }}>
          <div style={{
            background: 'var(--white)',
            padding: '36px 32px',
            display: 'flex',
            gap: '16px',
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: 'var(--accent)',
              fontWeight: 500,
              paddingTop: '3px',
              minWidth: '24px',
            }}>01</div>
            <div style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              fontWeight: 300,
            }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Inconsistent quality</strong> across your team — every PM writes stories differently, engineers interpret them differently, and QA tests them differently.
            </div>
          </div>

          <div style={{
            background: 'var(--white)',
            padding: '36px 32px',
            display: 'flex',
            gap: '16px',
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: 'var(--accent)',
              fontWeight: 500,
              paddingTop: '3px',
              minWidth: '24px',
            }}>02</div>
            <div style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              fontWeight: 300,
            }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>AC is an afterthought.</strong> Most user stories have success metrics where acceptance criteria should be — and nobody catches it until the sprint review.
            </div>
          </div>

          <div style={{
            background: 'var(--white)',
            padding: '36px 32px',
            display: 'flex',
            gap: '16px',
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: 'var(--accent)',
              fontWeight: 500,
              paddingTop: '3px',
              minWidth: '24px',
            }}>03</div>
            <div style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              fontWeight: 300,
            }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Prioritization is gut feel</strong> dressed up as a framework. You know the formula, but applying it consistently to every story across a full roadmap takes hours.
            </div>
          </div>

          <div style={{
            background: 'var(--white)',
            padding: '36px 32px',
            display: 'flex',
            gap: '16px',
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: 'var(--accent)',
              fontWeight: 500,
              paddingTop: '3px',
              minWidth: '24px',
            }}>04</div>
            <div style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              fontWeight: 300,
            }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Format tax is real.</strong> Jira, Linear, Notion, Confluence — every tool has a different structure, and you're the one reformatting everything by hand.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
