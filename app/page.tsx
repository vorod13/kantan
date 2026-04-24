'use client';

import { useState } from 'react';

interface RICEScore {
  reach: { score: number; justification: string };
  impact: { score: number; justification: string };
  confidence: { score: number; justification: string };
  effort: { score: number; justification: string };
  totalScore: number;
  calculation: string;
}

interface StoryResult {
  userStory: string;
  acceptanceCriteria: string[];
  rice: RICEScore;
  rateLimit?: {
    remaining: number;
    limit: number;
  };
}

export default function Home() {
  const [userType, setUserType] = useState('');
  const [userAction, setUserAction] = useState('');
  const [userReason, setUserReason] = useState('');
  const [platform, setPlatform] = useState('web');
  const [acFormat, setAcFormat] = useState('default');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!userType || !userAction || !userReason) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType,
          userAction,
          userReason,
          platform,
          acFormat,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to generate story');
      }

      setResult(data);
      
      // Clear input fields after successful generation
      setUserType('');
      setUserAction('');
      setUserReason('');
      setPlatform('web');
      setAcFormat('default');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '48px 24px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ 
          fontFamily: "'Shippori Mincho', serif",
          fontSize: '48px',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '12px'
        }}>
          かんたん
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)'
        }}>
          Kantan — Specs, simplified.
        </div>
        <div style={{
          fontSize: '14px',
          color: 'var(--muted)',
          marginTop: '16px',
          maxWidth: '480px'
        }}>
          Phase 2A: API Integration Test — Generate user stories with Claude
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        {/* Title Bar */}
        <div style={{
          background: 'var(--paper2)',
          padding: '12px 18px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
          <div style={{ 
            marginLeft: '12px',
            fontSize: '11px',
            color: 'var(--muted)',
            fontFamily: "'DM Mono', monospace"
          }}>
            thekantancompany.com — API Test
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          {/* Input Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: '6px'
              }}>
                User Type
              </label>
              <input
                type="text"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                placeholder="e.g., power user, free tier customer"
                style={{
                  width: '100%',
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: '6px'
              }}>
                What do they want to do?
              </label>
              <input
                type="text"
                value={userAction}
                onChange={(e) => setUserAction(e.target.value)}
                placeholder="e.g., export data to CSV"
                style={{
                  width: '100%',
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: '6px'
              }}>
                Why does it matter?
              </label>
              <input
                type="text"
                value={userReason}
                onChange={(e) => setUserReason(e.target.value)}
                placeholder="e.g., I can analyze trends offline"
                style={{
                  width: '100%',
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: '6px'
              }}>
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="api">API</option>
              </select>
            </div>

            <div>
              <label style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: '6px'
              }}>
                AC Format
              </label>
              <select
                value={acFormat}
                onChange={(e) => setAcFormat(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--ink)',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="default">Kantan Default</option>
                <option value="gherkin">Gherkin (Given/When/Then)</option>
                <option value="numbered">Numbered List</option>
                <option value="prose">Prose/Paragraph</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'var(--dim)' : 'var(--accent)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '5px',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.background = 'var(--accentL)';
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.background = 'var(--accent)';
              }}
            >
              {loading ? 'Generating...' : '✨ Generate Story'}
            </button>

            {error && (
              <div style={{
                background: '#FEE',
                border: '1px solid #FCC',
                borderRadius: '5px',
                padding: '12px',
                fontSize: '12px',
                color: '#C00'
              }}>
                {error}
              </div>
            )}
          </div>

          {/* Output Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--border)',
                borderRadius: '8px',
                padding: '48px',
                textAlign: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid var(--border)',
                  borderTop: '3px solid var(--accent)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--muted)',
                  fontWeight: 500
                }}>
                  Generating your story...
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--dim)'
                }}>
                  This takes about 10-15 seconds
                </div>
                <style jsx>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : !result ? (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--border)',
                borderRadius: '8px',
                padding: '48px',
                textAlign: 'center',
                color: 'var(--dim)',
                fontSize: '13px'
              }}>
                Fill in the fields and click Generate to see your story
              </div>
            ) : (
              <>
                <div style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '16px'
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '8px'
                  }}>
                    User Story
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--ink)',
                    lineHeight: 1.6,
                    fontWeight: 400
                  }}>
                    {result.userStory}
                  </div>
                </div>

                <div style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '16px',
                  flex: 1
                }}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '8px'
                  }}>
                    Acceptance Criteria
                  </div>
                  {result.acceptanceCriteria.map((ac, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: 'var(--muted)',
                      lineHeight: 1.6
                    }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>·</span>
                      <span>{ac}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: 'var(--paper2)',
                  border: '1px solid var(--border)',
                  borderRadius: '5px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>
                    RICE Priority
                  </span>
                  <span style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: 'var(--accent)',
                    fontFamily: "'Shippori Mincho', serif"
                  }}>
                    {result.rice.totalScore.toFixed(1)}
                  </span>
                </div>

                <div style={{
                  fontSize: '10px',
                  color: 'var(--dim)',
                  textAlign: 'center',
                  padding: '8px'
                }}>
                  {result.rateLimit && `${result.rateLimit.remaining} of ${result.rateLimit.limit} free stories remaining today`}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: '32px',
        textAlign: 'center',
        fontSize: '11px',
        color: 'var(--dim)',
        maxWidth: '600px'
      }}>
        Phase 2A Test Build — This page demonstrates the Claude API integration. Your full landing page is still live at the root URL.
      </div>
    </div>
  );
}
