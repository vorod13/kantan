export default function Quote() {
  return (
    <div style={{
      padding: '80px 48px',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: '13px',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.3em',
        marginBottom: '32px',
      }}>簡単 · かんたん · easy</div>
      
      <div style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: 'clamp(22px, 3vw, 36px)',
        fontWeight: 400,
        color: 'var(--white)',
        maxWidth: '640px',
        lineHeight: 1.45,
        marginBottom: '20px',
      }}>
        <span style={{ whiteSpace: 'nowrap' }}>The best PMs don't write better specs.</span><br/>
        <span style={{ whiteSpace: 'nowrap' }}>They spend <em style={{ color: 'var(--accentL)', fontStyle: 'normal' }}>less time</em> writing them.</span>
      </div>
      
      <div style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.1em',
      }}>— The Kantan philosophy</div>
    </div>
  );
}
