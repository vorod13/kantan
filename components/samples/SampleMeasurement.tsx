'use client';

import { useState } from 'react';

export default function SampleMeasurement({ subscriptionTier }: { subscriptionTier?: string }) {
  // Check if user has paid tier (Solo OR Founding)
  const isPaidTier = subscriptionTier === 'solo' || subscriptionTier === 'founding';
  
  // Copy state for individual sections
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({ onClick, section, label = 'Copy' }: { onClick: () => void; section: string; label?: string }) => (
    <button
      onClick={onClick}
      style={{
        fontSize: '11px',
        padding: '6px 12px',
        background: copiedSection === section ? 'var(--accent)' : 'var(--white)',
        color: copiedSection === section ? 'var(--white)' : 'var(--accent)',
        border: `1px solid ${copiedSection === section ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => {
        if (copiedSection !== section) {
          e.currentTarget.style.background = 'var(--paper2)';
        }
      }}
      onMouseOut={(e) => {
        if (copiedSection !== section) {
          e.currentTarget.style.background = 'var(--white)';
        }
      }}
    >
      {copiedSection === section ? '✓ Copied' : label}
    </button>
  );

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
      )}

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>North Star Metric</h3>
            {isPaidTier && (
              <CopyButton 
                section="northStar"
                onClick={() => copyToClipboard('Weekly Active Searchers (WAS) — Users who perform at least 1 search per week', 'northStar')}
              />
            )}
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>Leading Indicators</h3>
            {isPaidTier && (
              <CopyButton 
                section="leading"
                onClick={() => copyToClipboard(
                  'Leading Indicators:\n' +
                  '• Search attempts: Total searches performed (successful + zero results)\n' +
                  '• Click-through rate: % of searches that result in clicking a result\n' +
                  '• Zero-result rate: % of searches returning no results',
                  'leading'
                )}
              />
            )}
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>Guardrails</h3>
            {isPaidTier && (
              <CopyButton 
                section="guardrails"
                onClick={() => copyToClipboard(
                  'Guardrails:\n' +
                  '• Page load time: Search results must load in <500ms (p95)\n' +
                  '• Error rate: Search API errors must stay below 0.1%',
                  'guardrails'
                )}
              />
            )}
          </div>
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

        {/* Copy Entire Plan Button - Only for paid users */}
        {isPaidTier && (
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <CopyButton 
              section="fullPlan"
              label="Copy Entire Plan"
              onClick={() => copyToClipboard(
                'Measurement Plan — Search Feature\n\n' +
                'NORTH STAR METRIC:\n' +
                'Weekly Active Searchers (WAS) — Users who perform at least 1 search per week\n\n' +
                'Metric Type: Engagement\n' +
                'Cohort Window: 7 days\n' +
                'Analytics Platform: Mixpanel\n' +
                'Target: +15% WAS within 4 weeks\n\n' +
                'LEADING INDICATORS:\n' +
                '• Search attempts: Total searches performed (successful + zero results)\n' +
                '• Click-through rate: % of searches that result in clicking a result\n' +
                '• Zero-result rate: % of searches returning no results\n\n' +
                'GUARDRAILS:\n' +
                '• Page load time: Search results must load in <500ms (p95)\n' +
                '• Error rate: Search API errors must stay below 0.1%\n\n' +
                'EVENT TRACKING SCHEMA:\n' +
                '// Primary event\n' +
                'search_performed\n' +
                '  query: string\n' +
                '  results_count: integer\n' +
                '  search_type: \'global\' | \'scoped\'\n' +
                '  user_id: string\n\n' +
                '// Interaction event\n' +
                'search_result_clicked\n' +
                '  result_position: integer\n' +
                '  result_id: string\n' +
                '  query: string',
                'fullPlan'
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
