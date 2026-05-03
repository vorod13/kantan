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

function DemoGenerator({ subscriptionTier, isSignedIn }: { subscriptionTier: string; isSignedIn: boolean }) {
  const [userType, setUserType] = useState('');
  const [userAction, setUserAction] = useState('');
  const [userReason, setUserReason] = useState('');
  const [platform, setPlatform] = useState('');
  const [acFormat, setAcFormat] = useState('default');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState('');
  const [selectedTier, setSelectedTier] = useState<'free' | 'solo' | 'team'>('free');

  const isSoloTier = subscriptionTier === 'solo';
  const isAtLimit = result?.rateLimit?.remaining === 0;

  // Show paywall overlay for Solo tier preview (not actual Solo subscribers)
  const showSoloPaywall = selectedTier === 'solo' && !isSoloTier;

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
          marginBottom: '24px',
        }}>Generate user stories with AC and RICE scoring in seconds</p>

        {/* Tier Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>Preview Tier:</span>
          <div style={{
            display: 'flex',
            background: 'var(--paper2)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '3px',
            gap: '2px',
          }}>
            <button
              onClick={() => setSelectedTier('free')}
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: selectedTier === 'free' ? 'var(--white)' : 'transparent',
                color: selectedTier === 'free' ? 'var(--ink)' : 'var(--muted)',
                transition: 'all 0.2s',
              }}
            >
              Free
            </button>
            <button
              onClick={() => setSelectedTier('solo')}
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: selectedTier === 'solo' ? 'var(--white)' : 'transparent',
                color: selectedTier === 'solo' ? 'var(--ink)' : 'var(--muted)',
                transition: 'all 0.2s',
              }}
            >
              Solo · $19
            </button>
            <button
              onClick={() => setSelectedTier('team')}
              disabled
              style={{
                padding: '6px 16px',
                fontSize: '13px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                cursor: 'not-allowed',
                background: 'transparent',
                color: 'var(--muted)',
                opacity: 0.5,
              }}
            >
              Team · $79 <span style={{fontSize: '9px', background: 'var(--border)', padding: '2px 6px', borderRadius: '8px', marginLeft: '4px'}}>SOON</span>
            </button>
          </div>
          {isSoloTier && (
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--accent)',
              padding: '4px 10px',
              background: 'var(--paper2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
            }}>
              ✨ Solo Active
            </span>
          )}
        </div>

        {/* Generator Container with Relative Positioning for Overlay */}
        <div style={{ position: 'relative' }}>
          
          {/* Paywall Overlay - Email Gate (Not Signed In AND Free Tier) */}
          {!isSignedIn && selectedTier === 'free' && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13, 13, 13, 0.85)',
              backdropFilter: 'blur(4px)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              padding: '20px',
            }}>
              <div style={{
                background: 'var(--white)',
                padding: '40px',
                borderRadius: '12px',
                maxWidth: '480px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                <h2 style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                }}>Enter your email to start</h2>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--muted)',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}>
                  Generate 5 user stories per week, free. No credit card required.
                </p>
                <a
                  href="/sign-in"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    padding: '14px 32px',
                    background: 'var(--accent)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 500,
                    fontSize: '15px',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Get Your Magic Link — Free →
                </a>
              </div>
            </div>
          )}

          {/* Paywall Overlay - Free Tier Hit Limit */}
          {isSignedIn && !isSoloTier && isAtLimit && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13, 13, 13, 0.85)',
              backdropFilter: 'blur(4px)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              padding: '20px',
            }}>
              <div style={{
                background: 'var(--white)',
                padding: '40px',
                borderRadius: '12px',
                maxWidth: '480px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                <h2 style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                }}>You've used your 5 free stories this week</h2>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--muted)',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}>
                  Upgrade to Solo for 200 stories/month and unlock unlimited potential.
                </p>
                <a
                  href="https://buy.stripe.com/test_bJebJ14LD3EX2ZT5jjb7y01"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: 'var(--accent)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 500,
                    fontSize: '15px',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Upgrade to Solo · $19/month →
                </a>
              </div>
            </div>
          )}

          {/* Paywall Overlay - Solo Tier Preview */}
          {showSoloPaywall && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13, 13, 13, 0.85)',
              backdropFilter: 'blur(4px)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              padding: '20px',
            }}>
              <div style={{
                background: 'var(--white)',
                padding: '40px',
                borderRadius: '12px',
                maxWidth: '480px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}>
                <h2 style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                }}>Solo Tier - $19/month</h2>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--muted)',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}>
                  Generate 200 user stories per month with full access to all Solo features.
                </p>
                <a
                  href="https://buy.stripe.com/test_bJebJ14LD3EX2ZT5jjb7y01"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: 'var(--accent)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 500,
                    fontSize: '15px',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Get Solo Access · $19/month →
                </a>
              </div>
            </div>
          )}

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
                  <a href="https://buy.stripe.com/test_00waEX7XP6R9bwpbHHb7y00" style={{ color: 'var(--accent)', fontWeight: 500 }}>
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
      </div> {/* Close relative positioned container */}
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

  // Get subscription tier from user metadata
  const subscriptionTier = (user?.publicMetadata?.subscriptionTier as string) || 'free';

  // Pass both signedIn status and tier to generator
  return <DemoGenerator subscriptionTier={subscriptionTier} isSignedIn={isSignedIn} />;
}
