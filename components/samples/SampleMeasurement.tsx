export default function SampleMeasurement() {
  return (
    <div style={{ padding: '24px' }}>
      {/* Upgrade Banner */}
      <div style={{
        background: 'var(--paper2)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '14px',
          color: 'var(--ink)',
          marginBottom: '12px',
          fontWeight: 500,
        }}>
          This is a sample measurement plan. Upgrade to Solo to generate your own.
        </p>
        <a
          href="https://buy.stripe.com/test_bJebJ14LD3EX2ZT5jjb7y01"
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Upgrade to Solo · $19/month →
        </a>
      </div>

      {/* Sample Content */}
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
      }}>
        <h2 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '20px',
        }}>Measurement Plan — Search Feature Example</h2>

        {/* North Star Metric */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '8px',
          }}>North Star Metric</h3>
          <div style={{
            fontSize: '14px',
            color: 'var(--ink)',
            background: 'var(--paper)',
            padding: '12px 16px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
          }}>
            <strong>Weekly Active Searchers (WAS)</strong> — Users who perform at least 1 search per week
          </div>
        </div>

        {/* Metric Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
            }}>Metric Type</h4>
            <p style={{ fontSize: '13px', color: 'var(--ink)' }}>Engagement</p>
          </div>
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
            }}>Cohort Window</h4>
            <p style={{ fontSize: '13px', color: 'var(--ink)' }}>7 days</p>
          </div>
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
            }}>Analytics Platform</h4>
            <p style={{ fontSize: '13px', color: 'var(--ink)' }}>Mixpanel</p>
          </div>
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
            }}>Target</h4>
            <p style={{ fontSize: '13px', color: 'var(--ink)' }}>+15% WAS within 4 weeks</p>
          </div>
        </div>

        {/* Leading Indicators */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '12px',
          }}>Leading Indicators</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <div style={{
              fontSize: '13px',
              color: 'var(--ink)',
              background: 'var(--paper)',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
            }}>
              <strong>Search attempts:</strong> Total searches performed (successful + zero results)
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--ink)',
              background: 'var(--paper)',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
            }}>
              <strong>Click-through rate:</strong> % of searches that result in clicking a result
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--ink)',
              background: 'var(--paper)',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
            }}>
              <strong>Zero-result rate:</strong> % of searches returning no results
            </div>
          </div>
        </div>

        {/* Guardrails */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '12px',
          }}>Guardrails</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <div style={{
              fontSize: '13px',
              color: 'var(--ink)',
              background: 'var(--paper)',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
            }}>
              <strong>Page load time:</strong> Search results must load in &lt;500ms (p95)
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--ink)',
              background: 'var(--paper)',
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
            }}>
              <strong>Error rate:</strong> Search API errors must stay below 0.1%
            </div>
          </div>
        </div>

        {/* Event Schema */}
        <div>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '12px',
          }}>Event Tracking Schema</h3>
          <div style={{
            background: 'var(--ink)',
            color: 'var(--white)',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            overflow: 'auto',
          }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#8B949E', marginBottom: '4px' }}>// Primary event</div>
              <div><span style={{ color: '#FF7B72' }}>search_performed</span></div>
              <div style={{ paddingLeft: '16px', marginTop: '4px' }}>
                <div>query: string</div>
                <div>results_count: integer</div>
                <div>search_type: 'global' | 'scoped'</div>
                <div>user_id: string</div>
              </div>
            </div>
            <div>
              <div style={{ color: '#8B949E', marginBottom: '4px' }}>// Interaction event</div>
              <div><span style={{ color: '#FF7B72' }}>search_result_clicked</span></div>
              <div style={{ paddingLeft: '16px', marginTop: '4px' }}>
                <div>result_position: integer</div>
                <div>result_id: string</div>
                <div>query: string</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
