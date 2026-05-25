export default function SampleDashboard({ subscriptionTier }: { subscriptionTier?: string }) {
  // Check if user has paid tier (Solo OR Founding)
  const isPaidTier = subscriptionTier === 'solo' || subscriptionTier === 'founding';

  return (
    <div style={{ padding: '24px' }}>
      {/* Upgrade Banner - Only show for free tier */}
      {!isPaidTier && (
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
            This is a sample dashboard blueprint. Upgrade to Solo to generate your own.
          </p>
          <a
            href="https://buy.stripe.com/28E28reqi4nIb1qdYXbV601"
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
      )}

      {/* Sample Dashboard */}
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
          marginBottom: '8px',
        }}>Dashboard Blueprint — Search Feature</h2>
        <p style={{
          fontSize: '13px',
          color: 'var(--muted)',
          marginBottom: '24px',
        }}>
          Recommended dashboard layout for tracking search engagement metrics
        </p>

        {/* Top Metrics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}>
          {/* Metric Card 1 */}
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '8px',
            }}>Weekly Active Searchers</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '4px',
            }}>2,847</div>
            <div style={{
              fontSize: '12px',
              color: 'var(--accent)',
              fontWeight: 500,
            }}>↑ 18% vs last week</div>
          </div>

          {/* Metric Card 2 */}
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '8px',
            }}>Click-Through Rate</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '4px',
            }}>74.3%</div>
            <div style={{
              fontSize: '12px',
              color: 'var(--accent)',
              fontWeight: 500,
            }}>↑ 5.2% vs last week</div>
          </div>

          {/* Metric Card 3 */}
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '8px',
            }}>Zero Result Rate</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '4px',
            }}>8.1%</div>
            <div style={{
              fontSize: '12px',
              color: '#C00',
              fontWeight: 500,
            }}>↓ 2.3% vs last week</div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div style={{
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--ink)',
            marginBottom: '16px',
          }}>Weekly Active Searchers Trend</h3>
          
          {/* Simple Bar Chart Mockup */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            height: '140px',
            paddingTop: '20px',
          }}>
            {[65, 72, 68, 78, 85, 82, 92, 88, 95, 98, 94, 100].map((height, idx) => (
              <div key={idx} style={{
                flex: 1,
                background: idx === 11 ? 'var(--accent)' : 'var(--border)',
                height: `${height}%`,
                borderRadius: '4px 4px 0 0',
                position: 'relative',
              }}>
                {idx === 11 && (
                  <div style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                  }}>2.8K</div>
                )}
              </div>
            ))}
          </div>
          
          {/* X-axis labels */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '10px',
            color: 'var(--muted)',
          }}>
            <span>Week 1</span>
            <span>Week 12</span>
          </div>
        </div>

        {/* Guardrails Status */}
        <div style={{
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--ink)',
            marginBottom: '16px',
          }}>Guardrail Status</h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {/* Guardrail 1 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontWeight: 500,
                }}>Page Load Time (p95)</div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--muted)',
                  marginTop: '2px',
                }}>Target: &lt;500ms</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                }}>387ms</div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}></div>
              </div>
            </div>

            {/* Guardrail 2 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontWeight: 500,
                }}>API Error Rate</div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--muted)',
                  marginTop: '2px',
                }}>Target: &lt;0.1%</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                }}>0.03%</div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
