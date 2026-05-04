'use client';

import { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const soloPrice = isAnnual ? '$144' : '$19';
  const soloPer = isAnnual ? 'per year (2 months free)' : 'per month';
  const teamPrice = isAnnual ? '$600' : '$79';
  const teamPer = isAnnual ? 'per year (2 months free) · up to 5 seats' : 'per month · up to 5 seats';

  return (
    <section style={{
      padding: '100px 48px',
    }} id="pricing">
      <div style={{ maxWidth: '1200px', margin: 0 }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '16px',
        }}>Pricing</div>
        
        <h2 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 700,
          lineHeight: 1.12,
          color: 'var(--ink)',
          maxWidth: '640px',
          marginBottom: '20px',
        }}>Simple, like the name.</h2>

        {/* Billing Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px',
          marginTop: '8px',
        }}>
          <span style={{
            fontSize: '13px',
            fontWeight: isAnnual ? 400 : 500,
            color: isAnnual ? 'var(--muted)' : 'var(--ink)',
          }}>Monthly</span>
          <div
            onClick={() => setIsAnnual(!isAnnual)}
            role="switch"
            aria-checked={isAnnual}
            aria-label="Toggle annual billing"
            style={{
              width: '44px',
              height: '24px',
              background: 'var(--accent)',
              borderRadius: '12px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: isAnnual ? '23px' : '3px',
              width: '18px',
              height: '18px',
              background: '#fff',
              borderRadius: '50%',
              transition: 'left 0.2s',
            }}></div>
          </div>
          <span style={{
            fontSize: '13px',
            fontWeight: isAnnual ? 500 : 400,
            color: isAnnual ? 'var(--ink)' : 'var(--muted)',
          }}>
            Annual <span style={{
              fontSize: '11px',
              background: 'var(--accent)',
              color: '#fff',
              padding: '2px 7px',
              borderRadius: '10px',
              marginLeft: '4px',
              fontWeight: 500,
            }}>Save 17%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginTop: '56px',
          maxWidth: '900px',
        }}>
          {/* Free Tier */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '36px 28px',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '16px',
            }}>Free</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '44px',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1,
              marginBottom: '4px',
            }}>$0</div>
            <div style={{
              fontSize: '12px',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}>forever</div>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '28px',
              padding: 0,
            }}>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> 5 stories per week
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> User story + AC generation
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Copy plain text
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Kantan default AC format
              </li>
            </ul>
            <a
              href="#how"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--accentL)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent)'}
            >
              Get started
            </a>
          </div>

          {/* Solo Tier */}
          <div style={{
            background: 'var(--ink)',
            border: '1px solid var(--accent)',
            borderRadius: '8px',
            padding: '36px 28px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '-11px',
              left: '24px',
              background: 'var(--accent)',
              color: 'var(--white)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              borderRadius: '20px',
            }}>Most popular</div>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '16px',
            }}>Solo PM</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '44px',
              fontWeight: 700,
              color: 'var(--white)',
              lineHeight: 1,
              marginBottom: '4px',
            }}>{soloPrice}</div>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '24px',
            }}>{soloPer}</div>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '28px',
              padding: 0,
            }}>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> 200 stories/month
              </li>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> RICE priority scoring
              </li>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Smart copy — Notion · Jira · Linear
              </li>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> AC format templates + custom
              </li>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> North Star measurement plan
              </li>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Measurement blueprint — PDF/PNG
              </li>
              <li style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Last 5 session generations
              </li>
            </ul>
            <a
              href="https://buy.stripe.com/test_bJebJ14LD3EX2ZT5jjb7y01"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--accentL)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent)'}
            >
              Get early access
            </a>
          </div>

          {/* Team Tier */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '36px 28px',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              Team 
              <span style={{
                fontSize: '9px',
                fontWeight: 500,
                background: 'var(--border)',
                color: 'var(--muted)',
                padding: '2px 8px',
                borderRadius: '10px',
                letterSpacing: '0.05em',
              }}>COMING SOON</span>
            </div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '44px',
              fontWeight: 700,
              color: 'var(--ink)',
              lineHeight: 1,
              marginBottom: '4px',
            }}>{teamPrice}</div>
            <div style={{
              fontSize: '12px',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}>{teamPer}</div>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '28px',
              padding: 0,
            }}>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Everything in Solo
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Shared workspace template
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> One-click send to Jira · Linear · Notion
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Shareable blueprint link
              </li>
              <li style={{
                fontSize: '13px',
                color: 'var(--muted)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)' }}>✓</span> Team session history
              </li>
            </ul>
            <button
              disabled
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: '6px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textAlign: 'center',
                cursor: 'not-allowed',
                opacity: 0.5,
              }}
            >
              Notify me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
