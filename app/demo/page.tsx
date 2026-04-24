'use client';

import { useState } from 'react';

// TypeScript interfaces for type safety
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

// Character limits - centralized for easy maintenance
const CHAR_LIMITS = {
  USER_TYPE: 80,
  USER_ACTION: 120,
  USER_REASON: 150,
} as const;

export default function DemoPage() {
  // State management
  const [userType, setUserType] = useState('');
  const [userAction, setUserAction] = useState('');
  const [userReason, setUserReason] = useState('');
  const [platform, setPlatform] = useState('');
  const [acFormat, setAcFormat] = useState('default');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState('');
  const [showInterstitial, setShowInterstitial] = useState(false);

  // Input validation and sanitization
  const sanitizeInput = (value: string, maxLength: number): string => {
    // Trim whitespace and limit length
    return value.slice(0, maxLength).trim();
  };

  const handleGenerate = async () => {
    // Validate all required fields
    if (!userType.trim() || !userAction.trim() || !userReason.trim() || !platform) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setShowInterstitial(true);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Sanitize text inputs before sending to API
          userType: sanitizeInput(userType, CHAR_LIMITS.USER_TYPE),
          userAction: sanitizeInput(userAction, CHAR_LIMITS.USER_ACTION),
          userReason: sanitizeInput(userReason, CHAR_LIMITS.USER_REASON),
          platform, // Dropdown value, no sanitization needed
          acFormat,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to generate story');
      }

      // Wait for interstitial minimum time (1.6s)
      await new Promise(resolve => setTimeout(resolve, 1600));
      
      setShowInterstitial(false);
      
      // Small delay before starting reveal
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setResult(data);
      
      // Clear form after successful generation
      setUserType('');
      setUserAction('');
      setUserReason('');
      setPlatform('');
      setAcFormat('default');
    } catch (err: any) {
      setShowInterstitial(false);
      // Sanitize error message to prevent XSS
      setError(String(err.message).slice(0, 200));
    } finally {
      setLoading(false);
    }
  };

  // Character counter with color coding
  const getCharCount = (text: string, limit: number) => {
    const count = text.length;
    const percent = (count / limit) * 100;
    let color = '#7A7368'; // muted
    if (percent >= 100) color = '#C00'; // red
    else if (percent >= 90) color = '#C8410A'; // accent/orange
    return { count, color };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F2EC',
      paddingTop: '80px',
    }}>
      {/* Header */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        background: 'rgba(245, 242, 236, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #D8D2C8',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '22px',
            fontWeight: 700,
            color: '#C8410A',
          }}>かんたん</span>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#7A7368',
          }}>Kantan</span>
        </div>
        <a href="/" style={{
          fontSize: '13px',
          color: '#7A7368',
          textDecoration: 'none',
        }}>← Back to home</a>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '60px 24px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '42px',
            fontWeight: 700,
            color: '#0D0D0D',
            marginBottom: '12px',
          }}>Generate your story</h1>
          <p style={{ fontSize: '14px', color: '#7A7368' }}>
            Free tier — 5 stories per day · <a href="/#pricing" style={{ color: '#C8410A', textDecoration: 'none' }}>Upgrade for unlimited</a>
          </p>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
          border: '1px solid #D8D2C8',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
          background: '#FDFAF5',
        }}>
          {/* Title Bar */}
          <div style={{
            background: '#EDE9E0',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid #D8D2C8',
            fontSize: '11px',
            color: '#B0A898',
            fontFamily: "'DM Mono', monospace",
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></div>
            <span style={{ marginLeft: '12px' }}>thekantancompany.com — free tier</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#FDFAF5',
          }}>
            {/* Input Side */}
            <div style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              borderRight: '1px solid #D8D2C8',
            }}>
              {/* User Type Field */}
              <div style={{ position: 'relative' }}>
                <label style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7A7368',
                  marginBottom: '6px',
                  display: 'block',
                }}>User type</label>
                <input
                  type="text"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value.slice(0, CHAR_LIMITS.USER_TYPE))}
                  placeholder='e.g. "returning pilot with 2+ missions flown"'
                  maxLength={CHAR_LIMITS.USER_TYPE}
                  style={{
                    width: '100%',
                    background: '#F5F2EC',
                    border: '1px solid #D8D2C8',
                    borderRadius: '5px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#0D0D0D',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  fontSize: '9px',
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  color: getCharCount(userType, CHAR_LIMITS.USER_TYPE).color,
                }}>
                  {getCharCount(userType, CHAR_LIMITS.USER_TYPE).count} / {CHAR_LIMITS.USER_TYPE}
                </div>
              </div>

              {/* What They Want Field */}
              <div style={{ position: 'relative' }}>
                <label style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7A7368',
                  marginBottom: '6px',
                  display: 'block',
                }}>What they want to do</label>
                <input
                  type="text"
                  value={userAction}
                  onChange={(e) => setUserAction(e.target.value.slice(0, CHAR_LIMITS.USER_ACTION))}
                  placeholder='e.g. "re-launch a saved ship config with one tap"'
                  maxLength={CHAR_LIMITS.USER_ACTION}
                  style={{
                    width: '100%',
                    background: '#F5F2EC',
                    border: '1px solid #D8D2C8',
                    borderRadius: '5px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#0D0D0D',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  fontSize: '9px',
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  color: getCharCount(userAction, CHAR_LIMITS.USER_ACTION).color,
                }}>
                  {getCharCount(userAction, CHAR_LIMITS.USER_ACTION).count} / {CHAR_LIMITS.USER_ACTION}
                </div>
              </div>

              {/* Why It Matters Field */}
              <div style={{ position: 'relative' }}>
                <label style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7A7368',
                  marginBottom: '6px',
                  display: 'block',
                }}>Why it matters</label>
                <input
                  type="text"
                  value={userReason}
                  onChange={(e) => setUserReason(e.target.value.slice(0, CHAR_LIMITS.USER_REASON))}
                  placeholder='e.g. "rebuilding a loadout from scratch loses mission momentum"'
                  maxLength={CHAR_LIMITS.USER_REASON}
                  style={{
                    width: '100%',
                    background: '#F5F2EC',
                    border: '1px solid #D8D2C8',
                    borderRadius: '5px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#0D0D0D',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  fontSize: '9px',
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  color: getCharCount(userReason, CHAR_LIMITS.USER_REASON).color,
                }}>
                  {getCharCount(userReason, CHAR_LIMITS.USER_REASON).count} / {CHAR_LIMITS.USER_REASON}
                </div>
              </div>

              {/* Platform Field */}
              <div style={{ position: 'relative' }}>
                <label style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7A7368',
                  marginBottom: '6px',
                  display: 'block',
                }}>Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#F5F2EC',
                    border: '1px solid #D8D2C8',
                    borderRadius: '5px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#0D0D0D',
                    fontFamily: "'DM Sans', sans-serif",
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

              {/* AC Format Select */}
              <div>
                <label style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#7A7368',
                  marginBottom: '6px',
                  display: 'block',
                }}>AC format template</label>
                <select
                  value={acFormat}
                  onChange={(e) => setAcFormat(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#F5F2EC',
                    border: '1px solid #D8D2C8',
                    borderRadius: '5px',
                    padding: '10px 14px',
                    fontSize: '13px',
                    color: '#0D0D0D',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <option value="default">Kantan default</option>
                  <option value="gherkin">Gherkin</option>
                  <option value="numbered">Numbered</option>
                  <option value="prose">Prose</option>
                </select>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !userType.trim() || !userAction.trim() || !userReason.trim() || !platform}
                style={{
                  marginTop: '8px',
                  padding: '12px 20px',
                  background: loading || !userType.trim() || !userAction.trim() || !userReason.trim() || !platform ? '#B0A898' : '#C8410A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: loading || !userType.trim() || !userAction.trim() || !userReason.trim() || !platform ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span>✦</span> Generate story
              </button>

              {/* Error Display */}
              {error && (
                <div style={{
                  background: '#FEE',
                  border: '1px solid #FCC',
                  borderRadius: '5px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#C00',
                }}>
                  {error}
                </div>
              )}
            </div>

            {/* Output Side */}
            <div style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7A7368',
              }}>Generated output</div>
              
              <div style={{
                background: '#F5F2EC',
                border: '1px solid #D8D2C8',
                borderRadius: '5px',
                padding: '18px',
                fontSize: '12px',
                lineHeight: 1.7,
                color: '#7A7368',
                flex: 1,
                minHeight: '280px',
                position: 'relative',
              }}>
                {/* Interstitial Overlay */}
                {showInterstitial && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(245, 242, 236, 0.96)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    zIndex: 200,
                    borderRadius: '5px',
                  }}>
                    <div style={{
                      fontFamily: "'Shippori Mincho', serif",
                      fontSize: '38px',
                      fontWeight: 700,
                      color: '#C8410A',
                      letterSpacing: '0.04em',
                      animation: 'kanaBreath 2s ease-in-out infinite',
                    }}>かんたん...</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#7A7368',
                      letterSpacing: '0.08em',
                      fontStyle: 'italic',
                    }}>writing the boring parts</div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#C8410A',
                        opacity: 0.3,
                        animation: 'dotPulse 1.2s ease-in-out infinite',
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#C8410A',
                        opacity: 0.3,
                        animation: 'dotPulse 1.2s ease-in-out infinite 0.2s',
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#C8410A',
                        opacity: 0.3,
                        animation: 'dotPulse 1.2s ease-in-out infinite 0.4s',
                      }}></div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!result && !showInterstitial && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    gap: '12px',
                  }}>
                    <div style={{ fontSize: '32px', color: '#B0A898', opacity: 0.5 }}>✦</div>
                    <div style={{ fontSize: '13px', color: '#B0A898', lineHeight: 1.6 }}>
                      Fill in the fields and<br />we'll handle the rest.
                    </div>
                  </div>
                )}

                {/* Story Content */}
                {result && !showInterstitial && (
                  <div>
                    <div style={{
                      color: '#0D0D0D',
                      fontWeight: 500,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      lineHeight: 1.7,
                      marginBottom: '14px',
                      animation: 'fadeIn 0.35s ease',
                    }}>
                      {result.userStory}
                    </div>
                    <span style={{
                      color: '#C8410A',
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '8px',
                      marginTop: '6px',
                      fontWeight: 600,
                    }}>ACCEPTANCE CRITERIA</span>
                    {result.acceptanceCriteria.map((ac, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: '6px',
                          fontSize: '11px',
                          color: '#7A7368',
                          lineHeight: 1.6,
                          animation: `fadeInUp 0.3s ease forwards`,
                          animationDelay: `${120 + idx * 100}ms`,
                          opacity: 0,
                        }}
                      >
                        <span style={{ color: '#C8410A', marginRight: '8px', fontWeight: 700 }}>·</span>
                        {ac}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Score Row */}
              {result && !showInterstitial && (
                <div style={{
                  background: '#EDE9E0',
                  border: '1px solid #D8D2C8',
                  borderRadius: '5px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: '11px', color: '#7A7368', fontWeight: 500 }}>
                    Priority score
                    <span style={{ fontSize: '9px', color: '#B0A898' }}> (impact × confidence ÷ effort)</span>
                  </span>
                  <div style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#C8410A',
                    animation: 'fadeIn 0.4s ease forwards',
                    animationDelay: `${120 + result.acceptanceCriteria.length * 100 + 150}ms`,
                    opacity: 0,
                  }}>
                    {result.rice.totalScore.toFixed(1)}
                  </div>
                </div>
              )}

              {/* Rate Limit Info */}
              {result && result.rateLimit && (
                <div style={{
                  fontSize: '10px',
                  color: '#B0A898',
                  textAlign: 'center',
                  padding: '8px',
                }}>
                  {result.rateLimit.remaining} of {result.rateLimit.limit} free stories remaining today
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          fontSize: '13px',
          color: '#7A7368',
        }}>
          <p>
            Free tier includes 5 stories per day. 
            <a href="/#pricing" style={{ color: '#C8410A', textDecoration: 'none' }}> Upgrade to Solo</a> for unlimited stories, RICE scoring, and smart copy to Notion/Trello/GitHub/Linear.
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes kanaBreath {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
