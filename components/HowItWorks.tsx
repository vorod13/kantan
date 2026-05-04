export default function HowItWorks() {
  return (
    <div style={{ marginBottom: '56px' }}>
      <div style={{
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '16px',
      }}>How it works</div>
      
      <h2 style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: 'clamp(32px, 4vw, 52px)',
        fontWeight: 700,
        lineHeight: 1.12,
        color: 'var(--ink)',
        maxWidth: '640px',
        marginBottom: '20px',
      }}>Four inputs. One complete story.</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '48px',
        marginTop: '64px',
        maxWidth: '960px',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '64px',
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '1px var(--border)',
            lineHeight: 1,
            marginBottom: '20px',
          }}>01</div>
          <div style={{
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: '10px',
          }}>Describe your user and goal</div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.65,
            fontWeight: 300,
          }}>Tell Kantan who the user is, what they want to do, and why it matters. No templates, no rigid forms — just a natural description.</div>
          <div style={{
            position: 'absolute',
            top: '32px',
            right: '-32px',
            fontSize: '24px',
            color: 'var(--border)',
          }}>→</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '64px',
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '1px var(--border)',
            lineHeight: 1,
            marginBottom: '20px',
          }}>02</div>
          <div style={{
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: '10px',
          }}>Set your context</div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.65,
            fontWeight: 300,
          }}>Platform, team size, effort level, and which metrics matter. Kantan uses this to calibrate the AC and prioritization score to your actual situation.</div>
          <div style={{
            position: 'absolute',
            top: '32px',
            right: '-32px',
            fontSize: '24px',
            color: 'var(--border)',
          }}>→</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '64px',
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '1px var(--border)',
            lineHeight: 1,
            marginBottom: '20px',
          }}>03</div>
          <div style={{
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: '10px',
          }}>Define how you'll measure it</div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.65,
            fontWeight: 300,
          }}>Select your metric type, cohort window, analytics platform, and guardrail. Kantan generates the full measurement plan — no freeform, no ambiguity.</div>
          <div style={{
            position: 'absolute',
            top: '32px',
            right: '-32px',
            fontSize: '24px',
            color: 'var(--border)',
          }}>→</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '64px',
            fontWeight: 800,
            color: 'transparent',
            WebkitTextStroke: '1px var(--border)',
            lineHeight: 1,
            marginBottom: '20px',
          }}>04</div>
          <div style={{
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: '10px',
          }}>Get a complete story</div>
          <div style={{
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.65,
            fontWeight: 300,
          }}>User story, definition-of-done AC, RICE priority score, measurement plan with event names, a shareable measurement blueprint, and export-ready output for Jira, Linear, or Notion.</div>
        </div>
      </div>
    </div>
  );
}
