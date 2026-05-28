'use client';

import { SignIn } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react';
import SampleMeasurement from '@/components/samples/SampleMeasurement';
import SampleDashboard from '@/components/samples/SampleDashboard';
import FirstTimeBanner from '@/components/FirstTimeBanner';


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

export default function DemoGenerator({ subscriptionTier, isSignedIn }: { subscriptionTier: string; isSignedIn: boolean }) {
  const [userType, setUserType] = useState('');
  const [userAction, setUserAction] = useState('');
  const [userReason, setUserReason] = useState('');
  const [platform, setPlatform] = useState('');
  const [acFormat, setAcFormat] = useState('default');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [error, setError] = useState('');
  const [selectedTier, setSelectedTier] = useState<'free' | 'solo' | 'team'>('free');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  
  // Demo mode state
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [hasGeneratedFirstStory, setHasGeneratedFirstStory] = useState(false);
  const [showDemoResult, setShowDemoResult] = useState(false);
  const [highlightResult, setHighlightResult] = useState(false);
  const [showDelayedPaywall, setShowDelayedPaywall] = useState(false);
  

  const loadingMessages = [
    'Thank you for your inputs',
    'Writing your story',
    'Scoring priorities',
    'Making it all kantan',
    'Making it even more kantan...',
  ];
  
  // Demo data for "Try an example"
	const DEMO_DATA = {
	  userType: 'busy online shopper',
	  userAction: 'search feature with autocomplete',
	  userReason: 'find products faster without typing full queries',
	  platform: 'Web',
	  result: {
		userStory: 'As a busy online shopper, I want a search feature with autocomplete suggestions, so that I can find products faster without typing full queries.',
		acceptanceCriteria: [
		  'Search bar is prominently displayed in header on all pages',
		  'Search accepts text input and shows autocomplete dropdown after user types 2+ characters',
		  'Autocomplete displays top 5 relevant products and categories based on partial input',
		  'User can navigate autocomplete suggestions using keyboard (arrow keys, Enter to select)',
		  'Clicking a suggestion navigates to product page or search results',
		  'Search works on mobile with touch-optimized dropdown',
		  'Autocomplete results load within 200ms of user input',
		  'Search history is saved locally for returning users (last 10 searches)',
		],
		rice: {
		  reach: {
			score: 8,
			justification: '80% of users search at least once per visit. High-traffic feature impacting majority of user base.',
		  },
		  impact: {
			score: 3,
			justification: 'High impact - directly reduces time-to-purchase by 30% based on A/B tests. Autocomplete significantly improves search success rate.',
		  },
		  confidence: {
			score: 90,
			justification: 'Validated by extensive user research, competitive analysis, and previous A/B test showing 25% increase in search-to-purchase conversion.',
		  },
		  effort: {
			score: 5,
			justification: 'Medium effort - requires frontend autocomplete component, backend search indexing with Elasticsearch, API endpoint for suggestions, and mobile optimization. Estimated 2-3 sprint cycles.',
		  },
		  totalScore: 43.2,
		  calculation: '(8 × 3 × 0.9) / 5 = 43.2',
		},
	  }
	};

	  // Check if user has paid tier (Solo OR Founding)
	  const isPaidTier = subscriptionTier === 'solo' || subscriptionTier === 'founding';
	  const isAtLimit = result?.rateLimit?.remaining === 0;

	  // Show paywall overlay for Solo tier preview (not actual paid subscribers)
	  const showSoloPaywall = selectedTier === 'solo' && !isPaidTier;
	  
	  // Track active tab
	  const [activeTab, setActiveTab] = useState<'story' | 'measure' | 'dashboard'>('story');
	  
	  // Show paywall for Measure/Dashboard tabs
	  const showTabPaywall = (activeTab === 'measure' || activeTab === 'dashboard') && !isPaidTier;
	  
	  // Get tier badge text
	  const getTierBadge = () => {
		if (selectedTier === 'free') return 'Free tier';
		if (selectedTier === 'solo') return 'Solo · $19/mo';
		if (selectedTier === 'team') return 'Team · $79/mo';
		return 'Free tier';
	  };

	  // Rotate loading messages every 3 seconds
	  React.useEffect(() => {
		let interval: NodeJS.Timeout;
		if (loading) {
		  interval = setInterval(() => {
			setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
		  }, 3000);
		} else {
		  setLoadingMessageIndex(0); // Reset when not loading
		}
		return () => clearInterval(interval);
	  }, [loading, loadingMessages.length]);
  
		// Show banner on first visit (Free tab only)
		useEffect(() => {
		  if (selectedTier === 'free') {
			const hasSeenBanner = localStorage.getItem('hasSeenInterstitial');
			if (!hasSeenBanner) {
			  setShowInterstitial(true);
			}
		  }
		}, [selectedTier]);

		// Check if user has generated first story
		useEffect(() => {
		  const hasGenerated = localStorage.getItem('hasGeneratedFirstStory');
		  if (hasGenerated) {
			setHasGeneratedFirstStory(true);
		  }
		}, []);

		// Delay paywall when user hits limit
		React.useEffect(() => {
		  if (isAtLimit && !showDelayedPaywall) {
			const timer = setTimeout(() => {
			  setShowDelayedPaywall(true);
			}, 10000); // 10 seconds
			return () => clearTimeout(timer);
		  }
		}, [isAtLimit, showDelayedPaywall]);

	
	// Handle "Try an example" from banner
	const handleTryExample = () => {
	  // Instantly pre-fill demo data
	  setUserType(DEMO_DATA.userType);
	  setUserAction(DEMO_DATA.userAction);
	  setUserReason(DEMO_DATA.userReason);
	  setPlatform(DEMO_DATA.platform);
	  
	  setIsDemoMode(true);
	  setShowInterstitial(false);
	  
	  // Scroll to generator
	  setTimeout(() => {
		document.getElementById('generator')?.scrollIntoView({ 
		  behavior: 'smooth', 
		  block: 'start' 
		});
	  }, 100);
		  
		};

	// Handle dismiss banner
	const handleDismissBanner = () => {
	  setShowInterstitial(false);
	};

	// Handle user editing fields - exits demo mode
	const handleUserInput = (field: 'userType' | 'userAction' | 'userReason', value: string) => {
	 console.log('handleUserInput called!', { field, showDemoResult });	
		
    // Exit demo mode when user types their own input
    if (isDemoMode) {
    setIsDemoMode(false);
    }
  
    // Clear demo result flag to show paywall
    if (showDemoResult) {
    setShowDemoResult(false);
    }
  
    if (field === 'userType') setUserType(value);
    if (field === 'userAction') setUserAction(value);
    if (field === 'userReason') setUserReason(value);
    };

	  const handleGenerate = async () => {
	  // Clear demo result flag
	  if (showDemoResult) {
		setShowDemoResult(false);
	  }
	  
	  // Validation
	  if (!userType.trim() || !userAction.trim() || !userReason.trim() || !platform) {
		setError('Please fill in all fields');
		return;
	  }

	  // Check if user has generated first story and should see paywall (but NOT in demo mode)
		if (hasGeneratedFirstStory && !isSignedIn && !isDemoMode) {
		  setError('Please sign up to continue generating stories');
		  return;
		}

	  // DEMO MODE: Show pre-written result without API call
	  if (isDemoMode) {
		setLoading(true);
		setError('');
		setResult(null);

		// Simulate loading for 2-3 seconds
		setTimeout(() => {
		  setResult(DEMO_DATA.result);
		  setLoading(false);
		  
		  // Mark that user has generated first story
		  localStorage.setItem('hasGeneratedFirstStory', 'true');
		  setHasGeneratedFirstStory(true);
		  setShowDemoResult(true);
		  
		  // Clear fields and exit demo mode
		  setUserType('');
		  setUserAction('');
		  setUserReason('');
		  setPlatform('');
		  setIsDemoMode(false);
		  
		  // Scroll to result and highlight it
		  setTimeout(() => {
		  document.getElementById('story-result')?.scrollIntoView({ 
			behavior: 'smooth', 
			block: 'center' 
		  });
		  
		  // Slight delay before highlighting to let result render
		  setTimeout(() => {
			setHighlightResult(true);
			
			// Remove highlight after 2 seconds
			setTimeout(() => setHighlightResult(false), 2000);
		  }, 200);
		}, 100);
		}, 2500);
		
		return;
	  }

	  // REAL MODE: Call API
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

		// Clear input fields after successful generation
		setUserType('');
		setUserAction('');
		setUserReason('');
		setPlatform('');

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
	  <>
		<style>{`
		  @keyframes pulse {
			0% {
			  box-shadow: 0 0 0 0 rgba(196, 77, 23, 0.7);
			}
			50% {
			  box-shadow: 0 0 0 10px rgba(196, 77, 23, 0);
			}
			100% {
			  box-shadow: 0 0 0 0 rgba(196, 77, 23, 0);
			}
		  }
		  
		  @keyframes highlightFade {
			0% {
			  border-color: var(--accent);
			  box-shadow: 0 0 20px rgba(196, 77, 23, 0.3);
			}
			100% {
			  border-color: var(--border);
			  box-shadow: 0 0 0 rgba(196, 77, 23, 0);
			}
		  }
`       }</style>	
		
		<div style={{
		  maxWidth: '900px',
		}}>
		
		{/* First Time Interstitial - Free Tab Only */}
		{selectedTier === 'free' && showInterstitial && !isSignedIn && (
	    <FirstTimeBanner
		onTryExample={handleTryExample}
		onDismiss={handleDismissBanner}
			/>
		)}

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
        <div style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          padding: '3px 10px',
          border: '1px solid var(--border)',
          borderRadius: '20px',
        }}>
          {getTierBadge()}
        </div>
        {isPaidTier && (
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--accent)',
            padding: '4px 10px',
            background: 'var(--paper2)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          }}>
            ✦ {subscriptionTier === 'founding' ? 'Founding Member' : 'Solo'} Active
          </span>
        )}
      </div>

      {/* Generator Container with Relative Positioning for Overlay */}
      <div style={{ position: 'relative' }}>
        
        {/* Paywall Overlay - Email Gate (Not Signed In AND Free Tier) */}
        {!isSignedIn && selectedTier === 'free' && !isDemoMode && !showDemoResult && (
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
              <p style={{
			  fontSize: '14px',
			  color: 'var(--ink)',
			  marginBottom: '16px',
			  fontWeight: 500,
			}}>
			  You've used your first free story!
			</p>

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
			  Generate 3 user stories per week, free. No credit card required.
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
        {isSignedIn && !isPaidTier && showDelayedPaywall && (
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
              }}>You've used your 3 free stories this week</h2>
              <p style={{
                fontSize: '15px',
                color: 'var(--muted)',
                marginBottom: '24px',
                lineHeight: 1.6,
              }}>
                Upgrade to Solo for 200 stories/month and unlock unlimited potential.
              </p>
              <a
                href="https://buy.stripe.com/28E28reqi4nIb1qdYXbV601"
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
                href="https://buy.stripe.com/28E28reqi4nIb1qdYXbV601"
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

      {/* Demo Wrapper with Browser Bar and Tabs */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      }}>
        {/* Browser Bar */}
        <div style={{
          background: 'var(--paper2)',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E85C28' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E8A020' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#5C9E5C' }}></div>
          <span style={{
            fontSize: '11px',
            color: 'var(--dim)',
            marginLeft: '8px',
            fontFamily: "'DM Mono', monospace",
          }}>
            kantanlabs.com — {selectedTier} tier
          </span>
        </div>

        {/* Content Tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--border)',
          background: 'var(--paper2)',
        }}>
          <div
            onClick={() => setActiveTab('story')}
            style={{
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: 500,
              color: activeTab === 'story' ? 'var(--accent)' : 'var(--dim)',
              borderBottom: activeTab === 'story' ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            Story + AC
          </div>
          <div
            onClick={() => setActiveTab('measure')}
            style={{
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: 500,
              color: activeTab === 'measure' ? 'var(--accent)' : 'var(--dim)',
              borderBottom: activeTab === 'measure' ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              position: 'relative',
            }}
          >
            How we measure it
            <span style={{
              fontSize: '9px',
              background: 'var(--border)',
              color: 'var(--muted)',
              padding: '1px 6px',
              borderRadius: '10px',
              marginLeft: '6px',
            }}>Solo+</span>
          </div>
          <div
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: 500,
              color: activeTab === 'dashboard' ? 'var(--accent)' : 'var(--dim)',
              borderBottom: activeTab === 'dashboard' ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              position: 'relative',
            }}
          >
            Dashboard
            <span style={{
              fontSize: '9px',
              background: 'var(--border)',
              color: 'var(--muted)',
              padding: '1px 6px',
              borderRadius: '10px',
              marginLeft: '6px',
            }}>Solo+</span>
          </div>
        </div>

        {/* Tab Content - Show samples for Measure/Dashboard tabs */}
        {activeTab === 'measure' && (
		  <div style={{ position: 'relative' }}>
			<SampleMeasurement subscriptionTier={subscriptionTier} />
			<div style={{
			  position: 'absolute',
			  top: 0,
			  left: 0,
			  right: 0,
			  bottom: 0,
			  background: 'rgba(245, 242, 236, 0.95)',
			  display: 'flex',
			  alignItems: 'center',
			  justifyContent: 'center',
			  borderRadius: '8px',
			}}>
			  <div style={{
				textAlign: 'center',
				padding: '40px',
			  }}>
				<div style={{
				  fontFamily: "'Shippori Mincho', serif",
				  fontSize: '24px',
				  fontWeight: 700,
				  color: 'var(--ink)',
				  marginBottom: '8px',
				}}>Coming Very Soon</div>
				<p style={{
				  fontSize: '14px',
				  color: 'var(--muted)',
				}}>Measurement planning feature launching shortly</p>
			  </div>
			</div>
		  </div>
		)}

		{activeTab === 'dashboard' && (
		  <div style={{ position: 'relative' }}>
			<SampleDashboard subscriptionTier={subscriptionTier} />
			<div style={{
			  position: 'absolute',
			  top: 0,
			  left: 0,
			  right: 0,
			  bottom: 0,
			  background: 'rgba(245, 242, 236, 0.95)',
			  display: 'flex',
			  alignItems: 'center',
			  justifyContent: 'center',
			  borderRadius: '8px',
			}}>
			  <div style={{
				textAlign: 'center',
				padding: '40px',
			  }}>
				<div style={{
				  fontFamily: "'Shippori Mincho', serif",
				  fontSize: '24px',
				  fontWeight: 700,
				  color: 'var(--ink)',
				  marginBottom: '8px',
				}}>Coming Very Soon</div>
				<p style={{
				  fontSize: '14px',
				  color: 'var(--muted)',
				}}>Dashboard feature launching shortly</p>
			  </div>
			</div>
		  </div>
		)}

      {/* Input Form - Only show for Story tab */}
      {activeTab === 'story' && (
      <>
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        {/* Who is the user */}
        <div style={{ marginBottom: '20px' }}>
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
			  onChange={isDemoMode ? undefined : (e) => setUserType(e.target.value)}
			  onFocus={() => {
				if (showDemoResult) {
				  setShowDemoResult(false);
				}
			  }}
			  placeholder="e.g., a project manager"
			  disabled={loading}
			  readOnly={isDemoMode}
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
				cursor: isDemoMode ? 'default' : 'text',
			  }}
			/>
          <div style={{
            fontSize: '10px',
            color: getCharCount(userType, CHAR_LIMITS.USER_TYPE).color,
            marginTop: '4px',
            textAlign: 'right',
          }}>
            {getCharCount(userType, CHAR_LIMITS.USER_TYPE).count}/{CHAR_LIMITS.USER_TYPE}
          </div>
        </div>

        {/* What do they want to do */}
        <div style={{ marginBottom: '20px' }}>
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
		  onChange={isDemoMode ? undefined : (e) => setUserAction(e.target.value)}
		  onFocus={() => {
			if (showDemoResult) {
			  setShowDemoResult(false);
			}
		  }}
		  placeholder="e.g., export a task list as a CSV"
		  disabled={loading}
		  readOnly={isDemoMode}
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
			cursor: isDemoMode ? 'default' : 'text',
		  }}
		/>
          <div style={{
            fontSize: '10px',
            color: getCharCount(userAction, CHAR_LIMITS.USER_ACTION).color,
            marginTop: '4px',
            textAlign: 'right',
          }}>
            {getCharCount(userAction, CHAR_LIMITS.USER_ACTION).count}/{CHAR_LIMITS.USER_ACTION}
          </div>
        </div>

        {/* Why do they want to do this */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '6px',
            display: 'block',
          }}>Why do they want to do this?</label>
          <input
			type="text"
		  value={userReason}
		  onChange={isDemoMode ? undefined : (e) => setUserReason(e.target.value)}
		  onFocus={() => {
			if (showDemoResult) {
			  setShowDemoResult(false);
			}
		  }}
		  placeholder="e.g., so they can share progress with stakeholders"
		  disabled={loading}
		  readOnly={isDemoMode}
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
			cursor: isDemoMode ? 'default' : 'text',
		  }}
		/>
          <div style={{
            fontSize: '10px',
            color: getCharCount(userReason, CHAR_LIMITS.USER_REASON).color,
            marginTop: '4px',
            textAlign: 'right',
          }}>
            {getCharCount(userReason, CHAR_LIMITS.USER_REASON).count}/{CHAR_LIMITS.USER_REASON}
          </div>
        </div>

        {/* Platform */}
        <div style={{ marginBottom: '20px' }}>
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
		    onChange={isDemoMode ? undefined : (e) => setPlatform(e.target.value)}
		    disabled={loading || isDemoMode}
		    style={{
			width: '100%',
			background: 'var(--paper)',
			border: '1px solid var(--border)',
			borderRadius: '5px',
			padding: '10px 14px',
			fontSize: '13px',
			color: 'var(--ink)',
			fontFamily: "'DM Sans', sans-serif",
			cursor: isDemoMode ? 'default' : 'pointer',
			opacity: isDemoMode ? '0.7' : '1',
		  }}
>
            <option value="">Select platform...</option>
            <option value="Web">Web</option>
            <option value="iOS">iOS</option>
            <option value="Android">Android</option>
            <option value="Desktop">Desktop</option>
            <option value="Mobile (both)">Mobile (both)</option>
            <option value="All Platforms">All Platforms</option>
          </select>
        </div>

        {/* AC Format */}
        <div style={{ marginBottom: '20px' }}>
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
		  onChange={isDemoMode ? undefined : (e) => setAcFormat(e.target.value)}
		  disabled={loading || isDemoMode}
		  style={{
			width: '100%',
			background: 'var(--paper)',
			border: '1px solid var(--border)',
			borderRadius: '5px',
			padding: '10px 14px',
			fontSize: '13px',
			color: 'var(--ink)',
			fontFamily: "'DM Sans', sans-serif",
			cursor: isDemoMode ? 'default' : 'pointer',
			opacity: isDemoMode ? '0.7' : '1',
		  }}
		>
            <option value="default">Kantan (default)</option>
            <option value="gherkin">Gherkin (Given/When/Then)</option>
            <option value="numbered">Numbered list</option>
            <option value="prose">Prose paragraph</option>
          </select>
        </div>

	      {/* Helper text for demo mode */}
		  

		  {/* Generate button below */}
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
			transition: 'all 0.3s ease',
			...(isDemoMode && !loading && !result ? {
			  animation: 'pulse 2s ease-in-out infinite',
			  boxShadow: '0 0 0 0 rgba(196, 77, 23, 0.7)',
			} : {}),
		  }}
		>
		  {loading ? loadingMessages[loadingMessageIndex] : 'Generate Story'}
		</button>

        {/* Rate Limit Display */}
        {!isPaidTier && result?.rateLimit && (
          <div style={{
            marginTop: '12px',
            fontSize: '11px',
            color: 'var(--muted)',
            textAlign: 'center',
          }}>
            {result.rateLimit.remaining} of {result.rateLimit.limit} free stories remaining this week
            {result.rateLimit.remaining === 0 && (
              <div style={{ marginTop: '8px' }}>
                <a href="https://buy.stripe.com/28E28reqi4nIb1qdYXbV601" style={{ color: 'var(--accent)', fontWeight: 500 }}>
                  Upgrade to Solo for 200 stories/month →
                </a>
              </div>
            )}
          </div>
        )}

        {isPaidTier && result?.rateLimit && (
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
                  Need more? <a href="mailto:hello@kantanlabs.com" style={{ color: 'var(--accent)', fontWeight: 500 }}>Contact us!</a>
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
	  <div id="story-result" style={{
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '24px',
      animation: highlightResult ? 'highlightFade 2s ease-out forwards' : 'none',
  }}>
    
      {/* Copy Button */}
      <button
      onClick={() => {
        const copyText = `${result.userStory}\n\nAcceptance Criteria:\n${result.acceptanceCriteria.map((ac, idx) => `${idx + 1}. ${ac}`).join('\n')}`;
        navigator.clipboard.writeText(copyText);
      }}
      style={{
        float: 'right',
        padding: '8px 16px',
        background: 'var(--paper2)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--ink)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'var(--accent)';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'var(--paper2)';
        e.currentTarget.style.color = 'var(--ink)';
      }}
    >
      Copy Story + AC
    </button>
    
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
      </>
      )}
      </div> {/* Close demo wrapper */}
    </div> {/* Close relative positioned container */}
    </div>
  </>
);
}
