import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kantan — Specs, simplified.',
  description: 'Kantan turns a rough idea into a prioritized user story with acceptance criteria, RICE scoring, and a measurement plan in under 30 seconds. Built for product managers.',
  keywords: ['product management', 'user stories', 'RICE scoring', 'agile', 'specifications'],
  authors: [{ name: 'The Kantan Company' }],
  openGraph: {
    type: 'website',
    url: 'https://thekantancompany.com/',
    title: 'Kantan — Specs, simplified.',
    description: 'Generate a complete user story, AC, RICE score, and measurement plan in under 30 seconds. Built for PMs who ship.',
    images: [{ url: 'https://thekantancompany.com/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kantan — Specs, simplified.',
    description: 'Generate a complete user story, AC, RICE score, and measurement plan in under 30 seconds.',
    images: ['https://thekantancompany.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    'CCBot': 'noindex, nofollow',
    'GPTBot': 'noindex, nofollow',
    'ClaudeBot': 'noindex, nofollow',
    'PerplexityBot': 'noindex, nofollow',
    'ai': 'noai',
    'noai': 'true',
  },
};

export default function LandingPage() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          zIndex: 9999,
          padding: '8px 16px',
          background: 'var(--accent)',
          color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          textDecoration: 'none',
        }}
        onFocus={(e) => e.currentTarget.style.left = '0'}
        onBlur={(e) => e.currentTarget.style.left = '-9999px'}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        background: 'rgba(245,242,236,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '0.02em',
          }}>かんたん</span>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>Kantan</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#how-it-works" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.03em' }}>How it works</a>
          <a href="#pricing" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.03em' }}>Pricing</a>
          <a href="/demo" style={{
            background: 'var(--accent)',
            color: 'var(--white)',
            padding: '8px 20px',
            borderRadius: '4px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            fontSize: '13px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>Get started</a>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '120px 48px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 'clamp(120px, 18vw, 220px)',
            fontWeight: 800,
            lineHeight: 0.9,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(13,13,13,0.12)',
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: '-0.02em',
          }}>かんたん</div>

          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }}></div>
            For Product Managers
          </div>

          <h1 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 'clamp(42px, 6vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.08,
            color: 'var(--ink)',
            maxWidth: '680px',
            marginBottom: '24px',
          }}>
            Stop writing <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>specs</em>.<br />
            Start shipping <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>product</em>.
          </h1>

          <p style={{
            fontSize: '17px',
            color: 'var(--muted)',
            maxWidth: '480px',
            lineHeight: 1.65,
            marginBottom: '48px',
            fontWeight: 300,
          }}>
            Kantan generates complete user stories with acceptance criteria, RICE scoring, and measurement plans in under 30 seconds.
          </p>

          {/* Waitlist form with Beehiiv */}
          <iframe
            src="https://subscribe-forms.beehiiv.com/7a6c25e4-df78-476f-85f8-c24a9af95fe0"
            style={{
              background: 'white',
              border: '1px solid #D8D2C8',
              borderRadius: '6px',
              width: '100%',
              maxWidth: '440px',
              height: '52px',
            }}
            title="Kantan Waitlist"
          />

          <p style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '12px', letterSpacing: '0.02em' }}>
            Join 200+ PMs building faster
          </p>

          <div style={{
            display: 'flex',
            gap: '40px',
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid var(--border)',
          }}>
            <div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}>&lt;30s</div>
              <div style={{
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}>To generate</div>
            </div>
            <div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}>$9/mo</div>
              <div style={{
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}>Founding price</div>
            </div>
            <div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--ink)',
              }}>154/200</div>
              <div style={{
                fontSize: '11px',
                color: 'var(--muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}>Slots claimed</div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section style={{ padding: '100px 48px' }} id="problem">
          <div style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '16px',
          }}>The Problem</div>

          <h2 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--ink)',
            maxWidth: '640px',
            marginBottom: '20px',
          }}>
            Writing specs steals time from building product
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
            marginTop: '56px',
            maxWidth: '900px',
          }}>
            {[
              { num: '01', text: <><strong>Spec paralysis</strong> — teams can't start until every edge case is documented</> },
              { num: '02', text: <><strong>Inconsistent quality</strong> — acceptance criteria range from paragraph-long essays to "works as expected"</> },
              { num: '03', text: <><strong>Prioritization theater</strong> — RICE scores assigned by gut feel instead of data</> },
              { num: '04', text: <><strong>Formatting friction</strong> — copying stories to Jira, Notion, or Linear requires reformatting every time</> },
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'var(--white)',
                padding: '36px 32px',
                display: 'flex',
                gap: '16px',
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  paddingTop: '3px',
                  minWidth: '24px',
                }}>{item.num}</div>
                <div style={{
                  fontSize: '15px',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}>{item.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: '100px 48px', background: 'var(--paper2)' }} id="how-it-works">
          <div style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '16px',
          }}>How it works</div>

          <h2 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--ink)',
            maxWidth: '640px',
            marginBottom: '20px',
          }}>
            Four inputs. Thirty seconds. Done.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '48px',
            marginTop: '64px',
            maxWidth: '960px',
          }}>
            {[
              { num: '1', title: 'Describe', body: 'Who is the user, what do they want, and why does it matter?' },
              { num: '2', title: 'Generate', body: 'Kantan writes the story, AC, and RICE score — formatted and ready.' },
              { num: '3', title: 'Export', body: 'Copy to Notion, Jira, Linear, or GitHub in one click.' },
              { num: '4', title: 'Ship', body: 'Your team starts building instead of waiting for specs.' },
            ].map((step, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: '64px',
                  fontWeight: 800,
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--border)',
                  lineHeight: 1,
                  marginBottom: '20px',
                }}>{step.num}</div>
                <div style={{
                  fontSize: '17px',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: '10px',
                }}>{step.title}</div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}>{step.body}</div>
                {idx < 3 && (
                  <div style={{
                    position: 'absolute',
                    top: '32px',
                    right: '-24px',
                    color: 'var(--border)',
                    fontSize: '20px',
                  }}>→</div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ marginTop: '64px' }}>
            <a href="/demo" style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: 'var(--accent)',
              color: 'var(--white)',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}>Try the demo →</a>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: '100px 48px' }} id="pricing">
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
            marginBottom: '48px',
          }}>
            Simple pricing. No surprises.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1000px',
          }}>
            {/* Free Tier */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '40px 32px',
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}>Free</div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>$0</div>
              <div style={{
                fontSize: '13px',
                color: 'var(--dim)',
                marginBottom: '32px',
              }}>Forever</div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '32px',
              }}>
                {['5 stories per day', 'Basic AC templates', 'RICE scoring'].map((feature, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent)',
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="/demo" style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 24px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--ink)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}>Get started</a>
            </div>

            {/* Solo Tier (Featured) */}
            <div style={{
              background: 'var(--white)',
              border: '2px solid var(--accent)',
              borderRadius: '12px',
              padding: '40px 32px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--accent)',
                color: 'var(--white)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>Most popular</div>
              <div style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}>Solo</div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>$9</div>
              <div style={{
                fontSize: '13px',
                color: 'var(--dim)',
                marginBottom: '32px',
              }}>per month · founding price</div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '32px',
              }}>
                {['Unlimited stories', 'All AC templates', 'RICE scoring', 'Smart copy (Notion, Jira, Linear)', 'Priority support'].map((feature, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent)',
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="/demo" style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'var(--white)',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}>Get started</a>
            </div>

            {/* Team Tier */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '40px 32px',
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}>Team</div>
              <div style={{
                fontFamily: "'Shippori Mincho', serif",
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--ink)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>$29</div>
              <div style={{
                fontSize: '13px',
                color: 'var(--dim)',
                marginBottom: '32px',
              }}>per user/month</div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: '32px',
              }}>
                {['Everything in Solo', 'Shared templates', 'Team analytics', 'SSO', 'Custom integrations'].map((feature, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--accent)',
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="/demo" style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 24px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--ink)',
                textDecoration: 'none',
              }}>Get started</a>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section style={{
          padding: '80px 48px',
          background: 'var(--ink)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.3em',
            marginBottom: '32px',
          }}>簡単</div>
          <p style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 400,
            color: 'var(--white)',
            maxWidth: '640px',
            lineHeight: 1.45,
            marginBottom: '20px',
          }}>
            "The best PMs ship product, not <em style={{ color: 'var(--accentL)', fontStyle: 'normal' }}>perfect specs</em>."
          </p>
          <div style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}>— Every PM who's shipped</div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '48px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--ink)',
          }}>かんたん</div>
          <div style={{ fontSize: '12px', color: 'var(--dim)' }}>The Kantan Company © 2026</div>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/demo" style={{ fontSize: '12px', color: 'var(--dim)', textDecoration: 'none' }}>Demo</a>
          <a href="#pricing" style={{ fontSize: '12px', color: 'var(--dim)', textDecoration: 'none' }}>Pricing</a>
          <a href="mailto:hello@thekantancompany.com" style={{ fontSize: '12px', color: 'var(--dim)', textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>
    </>
  );
}
