'use client';
import { useState } from 'react';

interface NorthStar {
  name: string;
  description: string;
  metricType: string;
  cohortWindow: string;
  analyticsPlatform: string;
  target: string;
}

interface LeadingIndicator {
  name: string;
  measure: string;
  benchmark: string;
  target: string;
  predicts: string;
  signal: string;
}

interface Guardrail {
  name: string;
  threshold: string;
  benchmark: string;
  measure: string;
  signal: string;
}

interface EventSchema {
  eventName: string;
  description: string;
  properties: string[];
}

interface MeasurementPlanData {
  northStar: NorthStar;
  leadingIndicators: LeadingIndicator[];
  guardrails: Guardrail[];
  eventSchema: EventSchema[];
}

interface MeasurementPlanProps {
  data: MeasurementPlanData;
  isPaidTier: boolean;
}

const sectionLabel = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted)',
  marginBottom: '3px',
  whiteSpace: 'nowrap' as const,
};

const fieldValue = {
  fontSize: '13px',
  color: 'var(--ink)',
  lineHeight: 1.4,
};

export default function MeasurementPlan({ data, isPaidTier }: MeasurementPlanProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let copyText = `MEASUREMENT PLAN\n\n`;
    copyText += `North Star: ${data.northStar.name}\n`;
    copyText += `Target: ${data.northStar.target}\n`;
    copyText += `Metric Type: ${data.northStar.metricType} | Cohort: ${data.northStar.cohortWindow} | Platform: ${data.northStar.analyticsPlatform}\n\n`;
    copyText += `LEADING INDICATORS\n`;
    copyText += data.leadingIndicators.map(i =>
      `• ${i.name}\n  Measure: ${i.measure}\n  Benchmark: ${i.benchmark}\n  Target: ${i.target}\n  Predicts: ${i.predicts}\n  Signal: ${i.signal}`
    ).join('\n') + '\n\n';
    copyText += `GUARDRAILS\n`;
    copyText += data.guardrails.map(g =>
      `• ${g.name} (${g.threshold})\n  Measure: ${g.measure}\n  Benchmark: ${g.benchmark}\n  Signal: ${g.signal}`
    ).join('\n') + '\n\n';
    copyText += `EVENT TRACKING\n`;
    copyText += data.eventSchema.map(e =>
      `• ${e.eventName}: ${e.description}\n  ${e.properties.join(', ')}`
    ).join('\n');

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '24px' }}>

      {/* Upgrade Banner for Free Tier */}
      {!isPaidTier && (
        <div style={{
          background: 'var(--paper2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '12px', fontWeight: 500 }}>
            Upgrade to Solo to generate unlimited measurement plans
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
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Upgrade to Solo · $19/month →
          </a>
        </div>
      )}

      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
      }}>

        {/* Header with copy button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--ink)',
            margin: 0,
          }}>Measurement Plan</h2>

          <button
            onClick={handleCopy}
            style={{
              padding: '8px 16px',
              background: copied ? 'var(--accent)' : 'var(--paper2)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              color: copied ? '#fff' : 'var(--ink)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (!copied) {
                e.currentTarget.style.background = 'var(--paper2)';
                e.currentTarget.style.color = 'var(--ink)';
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy Measurement Plan'}
          </button>
        </div>

        {/* ── NORTH STAR ── */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px',
          }}>North Star Metric</h3>

          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                {data.northStar.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.4 }}>
                {data.northStar.description}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {[
                { label: 'Metric Type', value: data.northStar.metricType },
                { label: 'Cohort Window', value: data.northStar.cohortWindow, capitalize: true },
                { label: 'Analytics Platform', value: data.northStar.analyticsPlatform },
                { label: 'Target', value: data.northStar.target, accent: true },
              ].map((cell, idx) => (
                <div key={idx} style={{
                  padding: '8px 16px',
                  borderTop: '1px solid var(--border)',
                  borderRight: idx % 2 === 0 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={sectionLabel}>{cell.label}</div>
                  <div style={{
                    ...fieldValue,
                    fontWeight: 500,
                    color: cell.accent ? 'var(--accent)' : 'var(--ink)',
                    textTransform: cell.capitalize ? 'capitalize' : 'none',
                  }}>
                    {cell.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LEADING INDICATORS ── */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px',
          }}>Leading Indicators</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.leadingIndicators.map((indicator, idx) => (
              <div key={idx} style={{
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '8px 14px',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}>
                  {indicator.name}
                </div>

                <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <div style={sectionLabel}>Measure</div>
                    <div style={fieldValue}>{indicator.measure}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div style={sectionLabel}>Benchmark</div>
                      <div style={fieldValue}>{indicator.benchmark}</div>
                    </div>
                    <div>
                      <div style={sectionLabel}>Target</div>
                      <div style={{ ...fieldValue, fontWeight: 600, color: 'var(--accent)' }}>
                        {indicator.target}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={sectionLabel}>Predicts</div>
                    <div style={fieldValue}>{indicator.predicts}</div>
                  </div>
                  <div style={{
                    background: 'rgba(200, 65, 10, 0.05)',
                    border: '1px solid rgba(200, 65, 10, 0.15)',
                    borderRadius: '4px',
                    padding: '7px 10px',
                  }}>
                    <div style={{ ...sectionLabel, color: 'var(--accent)', marginBottom: '2px' }}>Signal</div>
                    <div style={{ ...fieldValue, fontSize: '12px' }}>{indicator.signal}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── GUARDRAILS ── */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px',
          }}>Guardrails</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.guardrails.map((guardrail, idx) => (
              <div key={idx} style={{
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '8px 14px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'nowrap',
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {guardrail.name}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    background: 'rgba(200, 65, 10, 0.08)',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    border: '1px solid rgba(200, 65, 10, 0.2)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {guardrail.threshold}
                  </div>
                </div>

                <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div style={sectionLabel}>Measure</div>
                      <div style={fieldValue}>{guardrail.measure}</div>
                    </div>
                    <div>
                      <div style={sectionLabel}>Benchmark</div>
                      <div style={fieldValue}>{guardrail.benchmark}</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(200, 65, 10, 0.05)',
                    border: '1px solid rgba(200, 65, 10, 0.15)',
                    borderRadius: '4px',
                    padding: '7px 10px',
                  }}>
                    <div style={{ ...sectionLabel, color: 'var(--accent)', marginBottom: '2px' }}>Signal</div>
                    <div style={{ ...fieldValue, fontSize: '12px' }}>{guardrail.signal}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EVENT TRACKING SCHEMA ── */}
        <div>
          <h3 style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px',
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
            {data.eventSchema.map((event, idx) => (
              <div key={idx} style={{ marginBottom: idx < data.eventSchema.length - 1 ? '16px' : '0' }}>
                <div style={{ color: '#8B949E', marginBottom: '4px' }}>// {event.description}</div>
                <div><span style={{ color: '#FF7B72' }}>{event.eventName}</span></div>
                <div style={{ paddingLeft: '16px', marginTop: '4px' }}>
                  {event.properties.map((prop, pIdx) => (
                    <div key={pIdx}>{prop}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
