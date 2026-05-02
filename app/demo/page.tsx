'use client';

import { useUser, SignIn } from '@clerk/nextjs';
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

// Character limits
const CHAR_LIMITS = {
  USER_TYPE: 80,
  USER_ACTION: 120,
  USER_REASON: 150,
} as const;

function DemoGenerator({ subscriptionTier }: { subscriptionTier: string }) {
  const [userType, setUserType] = useState('');
  const [userAction, setUserAction] = useState('');
  const [userReason, setUserReason] = useState('');
  const [platform, setPlatform] = useState('');
  const [acFormat, setAcFormat] = useState('default');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState('');

  const isSoloTier = subscriptionTier === 'solo';

  const handleGenerate = async () => {
    if (!userType.trim() || !userAction.trim() || !userReason.trim() || !platform) {
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
          userType: userType.slice(0, CHAR_LIMITS.USER_TYPE),
          userAction: userAction.slice(0, CHAR_LIMITS.USER_ACTION),
          userReason: userReason.slice(0, CHAR_LIMITS.USER_REASON),
          platform,
          acFormat,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to generate story');
      }

      setResult(data);
      
      // Clear form
      setUserType('');
      setUserAction('');
      setUserReason('');
      setPlatform('');
      setAcFormat('default');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCharCount = (text: string, limit: number) => {
    const percent = (text.length / limit) * 100;
    let color = '#7A7368';
    if (percent >= 100) color = '#C00';
    else if (percent >= 90) color = '#C8410A';
    return { count: text.length, color };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      padding: '40px 20px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '8px',
        }}>Story Generator</h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--muted)',
          marginBottom: '32px',
        }}>Generate user stories with AC and RICE scoring in seconds</p>

        {/* Input Form */}
        <div style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          {/* User Type */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <label style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
              display: 'block',
            }}>Who is the user?</label>
            <input
              type="text"
              value={userType}
              onChange={(e) => setUserType(e.target.value.slice(0, CHAR_LIMITS.USER_TYPE))}
              placeholder='e.g. "Product manager"'
              maxLength={CHAR_LIMITS.USER_TYPE}
              style={{
                width: '100%',
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '10px 14px',
                fontSize: '13px',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '10px',
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              color: getCharCount(userType, CHAR_LIMITS.USER_TYPE).color,
            }}>
              {getCharCount(userType, CHAR_LIMITS.USER_TYPE).count} / {CHAR_LIMITS.USER_TYPE}
            </div>
          </div>

          {/* What they want */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <label style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
              display: 'block',
            }}>What do they want to do?</label>
            <input
              type="text"
              value={userAction}
              onChange={(e) => setUserAction(e.target.value.slice(0, CHAR_LIMITS.USER_ACTION))}
              placeholder='e.g. "Export user stories to Jira"'
              maxLength={CHAR_LIMITS.USER_ACTION}
              style={{
                width: '100%',
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '10px 14px',
                fontSize: '13px',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '10px',
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              color: getCharCount(userAction, CHAR_LIMITS.USER_ACTION).color,
            }}>
              {getCharCount(userAction, CHAR_LIMITS.USER_ACTION).count} / {CHAR_LIMITS.USER_ACTION}
            </div>
          </div>

          {/* Why it matters */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <label style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
              display: 'block',
            }}>Why does it matter?</label>
            <input
              type="text"
              value={userReason}
              onChange={(e) => setUserReason(e.target.value.slice(0, CHAR_LIMITS.USER_REASON))}
              placeholder='e.g. "Save time on manual copy-paste"'
              maxLength={CHAR_LIMITS.USER_REASON}
              style={{
                width: '100%',
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '10px 14px',
                fontSize: '13px',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '10px',
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              color: getCharCount(userReason, CHAR_LIMITS.USER_REASON).color,
            }}>
              {getCharCount(userReason, CHAR_LIMITS.USER_REASON).count} / {CHAR_LIMITS.USER_REASON}
            </div>
          </div>

          {/* Platform Dropdown */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
              display: 'block',
            }}>Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '10px 14px',
                fontSize: '13px',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              <option value="">Select platform</option>
              <option value="Web">Web</option>
              <option value="iOS">iOS</option>
              <option value="Android">Android</option>
              <option value="Desktop">Desktop</option>
              <option value="Mobile (both iOS & Android)">Mobile (both iOS & Android)</option>
              <option value="All Platforms">All Platforms</option>
            </select>
          </div>

          {/* AC Format */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '6px',
              display: 'block',
            }}>AC Format</label>
            <select
              value={acFormat}
              onChange={(e) => setAcFormat(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '10px 14px',
                fontSize: '13px',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              <option value="default">Kantan (default)</option>
              <option value="gherkin">Gherkin (Given/When/Then)</option>
              <option value="numbered">Numbered list</option>
              <option value="prose">Prose paragraph</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !userType.trim() || !userAction.trim() || !userReason.trim() || !platform}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: loading || !userType.trim() || !userAction.trim() || !userReason.trim() || !platform ? '#B0A898' : '#C8410A',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              cursor: loading || !userType.trim() || !userAction.trim() || !userReason.trim() || !platform ? 'not-allowed' : 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </button>

          {/* Rate Limit Display */}
          {!isSoloTier && result?.rateLimit && (
            <div style={{
              marginTop: '12px',
              fontSize: '11px',
              color: 'var(--muted)',
              textAlign: 'center',
            }}>
              {result.rateLimit.remaining} of {result.rateLimit.limit} free stories remaining this week
              {result.rateLimit.remaining === 0 && (
                <div style={{ marginTop: '8px' }}>
                  <a href="#upgrade" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                    Upgrade to Solo for 200 stories/month →
                  </a>
                </div>
              )}
            </div>
          )}

          {isSoloTier && result?.rateLimit && (
            <>
              {/* Only show counter when at 150+ stories used */}
              {result.rateLimit.remaining <= 50 && result.rateLimit.remaining > 0 && (
                <div style={{
                  marginTop: '12px',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  textAlign: 'center',
                }}>
                  {result.rateLimit.remaining} of {result.rateLimit.limit} stories remaining this month
                </div>
              )}
              
              {/* Fair use message when limit hit */}
              {result.rateLimit.remaining === 0 && (
                <div style={{
                  marginTop: '12px',
                  fontSize: '12px',
                  color: 'var(--muted)',
                  textAlign: 'center',
                  padding: '12px',
                  background: 'var(--paper2)',
                  borderRadius: '6px',
                }}>
                  <div style={{ marginBottom: '6px', fontWeight: 500, color: 'var(--ink)' }}>
                    You've used your 200 stories this month
                  </div>
                  <div>
                    Need more? <a href="mailto:hello@thekantancompany.com" style={{ color: 'var(--accent)', fontWeight: 500 }}>Contact us!</a>
                  </div>
                </div>
              )}
            </>
          )}

          {error && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#FEE',
              border: '1px solid #C00',
              borderRadius: '4px',
              color: '#C00',
              fontSize: '13px',
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
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
              marginBottom: '16px',
            }}>Generated Story</h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '8px',
              }}>User Story</h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--ink)',
                lineHeight: 1.6,
              }}>{result.userStory}</p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '8px',
              }}>Acceptance Criteria</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {result.acceptanceCriteria.map((ac, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: 'var(--ink)',
                    lineHeight: 1.6,
                    marginBottom: '8px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent)',
                    }}>•</span>
                    {ac}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '8px',
              }}>RICE Score: {result.rice.totalScore}</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '13px',
                color: 'var(--muted)',
              }}>
                <div>Reach: {result.rice.reach.score}</div>
                <div>Impact: {result.rice.impact.score}</div>
                <div>Confidence: {result.rice.confidence.score}%</div>
                <div>Effort: {result.rice.effort.score}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DemoPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Loading state
  if (!isLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--paper)',
      }}>
        <p style={{ color: 'var(--muted)', fontFamily: "'DM Sans', sans-serif" }}>Loading...</p>
      </div>
    );
  }

  // Not signed in - show email gate
  if (!isSignedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--paper)',
        padding: '20px',
      }}>
        <div style={{
          maxWidth: '480px',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <h1 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: '12px',
          }}>Enter your email to start</h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}>
            Generate 5 user stories per week, free. No credit card required.
          </p>
        </div>
        
        <SignIn 
          fallbackRedirectUrl="/demo"
          signUpFallbackRedirectUrl="/demo"
          afterSignInUrl="/demo"
          afterSignUpUrl="/demo"
        />
      </div>
    );
  }

  // Get subscription tier from user metadata
  const subscriptionTier = (user?.publicMetadata?.subscriptionTier as string) || 'free';

  // Signed in - show generator with tier info
  return <DemoGenerator subscriptionTier={subscriptionTier} />;
}
