import Nav from '@/components/Nav';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import Quote from '@/components/Quote';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main>
      <Nav />
      
      {/* About Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '160px 48px 80px',
        position: 'relative',
        background: 'var(--paper)',
      }}>
        {/* Large Japanese characters background */}
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 'clamp(180px, 24vw, 280px)',
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
        }}>
          簡<br/>単
        </div>

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
          <span style={{
            display: 'block',
            width: '32px',
            height: '1px',
            background: 'var(--accent)',
          }}></span>
          About Kantan
        </div>

        <h1 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 'clamp(42px, 6vw, 64px)',
          fontWeight: 700,
          lineHeight: 1.08,
          color: 'var(--ink)',
          maxWidth: '680px',
          marginBottom: '24px',
        }}>
          Simplicity is the purest feature.
        </h1>

        <p style={{
          fontSize: '17px',
          color: 'var(--muted)',
          maxWidth: '560px',
          lineHeight: 1.65,
          fontWeight: 300,
        }}>
          かんたん (kantan) means simple. But it's more than that — it's the feeling when something just clicks. When the hard thing becomes easy. When you can finally exhale.
        </p>
      </section>

      {/* Problem Section */}
      <Problem />

      {/* How It Works Section */}
      <section style={{
        padding: '100px 48px',
        background: 'var(--paper)',
      }} id="how">
        <div style={{ maxWidth: '1200px', margin: 0 }}>
          <HowItWorks />
        </div>
      </section>

      {/* Quote Section */}
      <Quote />

      {/* Bio / Why Kantan Section */}
      <section style={{
        padding: '100px 48px',
        background: 'var(--paper2)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '16px',
            textAlign: 'center',
          }}>About Kantan</div>
          
          <h2 style={{
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--ink)',
            textAlign: 'center',
            marginBottom: '32px',
          }}>Why this exists</h2>
          
          <div style={{
            fontSize: '16px',
            color: 'var(--muted)',
            lineHeight: 1.75,
            fontWeight: 300,
          }}>
            <p style={{ marginBottom: '20px' }}>
              I've been a product leader for 20 years. I've written thousands of user stories. They take time and real effort to write: the format, the acceptance criteria, the prioritization score, and the measurement plan.
            </p>
            <p style={{ marginBottom: '20px' }}>
              At 45 minutes per story, I figured it was the price to pay. But the reality is it took away time from strategy and thinking. What if those 45 minutes became 30 seconds?
            </p>
            <p style={{ marginBottom: '20px' }}>
              Most tools either just organize your thinking, try to do everything, or cost too much for small teams. Kantan is the tool I always wished existed. It turns a rough idea into a complete, prioritized user story in under 30 seconds. Suddenly, those 45 minutes are back. 45 minutes to focus on your product vision, your next meeting, what you're going to eat that night or just life itself.
            </p>
            <p style={{ marginBottom: '20px' }}>
              かんたん (kantan) means "easy." This tool embodies that philosophy in its simplicity and focus. It's the companion that helps anyone create best-in-class user stories, complete with acceptance criteria, priority scoring, measurement plans, and dashboards.
            </p>
			<p style={{ marginBottom: '20px' }}>
			We're a small team focused on empowering everyone to build amazing things...easily. Welcome to Kantan Labs.
			</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
