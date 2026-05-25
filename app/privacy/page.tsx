'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main>
      <Nav />
      
      {/* Privacy Hero */}
      <section style={{
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '160px 48px 80px',
        background: 'var(--paper)',
      }}>
        <h1 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--ink)',
          marginBottom: '16px',
        }}>
          Privacy Policy
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--muted)',
          maxWidth: '600px',
          lineHeight: 1.6,
        }}>
          Last updated: May 25, 2026
        </p>
      </section>

      {/* Content */}
      <section style={{
        padding: '80px 48px',
        background: 'var(--white)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Key Promise */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF5EB 0%, #FFE8D6 100%)',
            border: '2px solid var(--accent)',
            borderRadius: '8px',
            padding: '32px',
            marginBottom: '48px',
          }}>
            <h2 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '12px',
            }}>
              We will NEVER sell your data.
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'var(--ink)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              That is simply wrong. Your information belongs to you, and we treat it with the respect it deserves.
            </p>
          </div>

          {/* What We Collect */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              What Information We Collect
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}>
              We collect only what we need to provide you with a great product experience:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              paddingLeft: '24px',
            }}>
              <li><strong>Account Information:</strong> Your email address and authentication details (handled securely by Clerk)</li>
              <li><strong>Payment Information:</strong> Billing details processed securely through Stripe (we never see or store your full credit card number)</li>
              <li><strong>Usage Data:</strong> Information about how you use Kantan, including user stories generated, features accessed, and errors encountered</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and timestamps to verify you are human and maintain service security</li>
            </ul>
          </div>

          {/* Why We Collect It */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Why We Collect This Information
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}>
              We use this data to:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              paddingLeft: '24px',
            }}>
              <li>Verify your identity and manage your account</li>
              <li>Process payments and manage your subscription tier</li>
              <li>Understand when something might go right or wrong with the product</li>
              <li>Improve Kantan based on how people actually use it</li>
              <li>Provide customer support when you need help</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
          </div>

          {/* Your Voice Matters */}
          <div style={{
            background: 'var(--paper2)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '40px',
          }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '12px',
            }}>
              We Want to Hear From You
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              We would love to talk to each and every one of you personally to get your feedback, but data gives us some idea of what is working and what is not. If you want your voice heard directly, email us at <a href="mailto:hello@kantanlabs.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@kantanlabs.com</a>. We are here and we read every message.
            </p>
          </div>

          {/* How We Protect Your Data */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              How We Protect Your Information
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              We use industry-standard security measures to protect your data. Your authentication is handled by Clerk, and all payment processing is managed by Stripe. We do not store sensitive payment information on our servers. All data transmission is encrypted using HTTPS.
            </p>
          </div>

          {/* Who We Share With */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Who We Share Your Information With
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}>
              We share your information only with trusted service providers who help us operate Kantan:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              paddingLeft: '24px',
            }}>
              <li><strong>Clerk:</strong> Authentication and user management</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Anthropic:</strong> AI model provider for story generation</li>
              <li><strong>Vercel:</strong> Hosting and infrastructure</li>
            </ul>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginTop: '16px',
            }}>
              We do not sell, rent, or share your personal information with advertisers or other third parties for their marketing purposes.
            </p>
          </div>

          {/* Your Rights */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Your Rights
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              You have the right to:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              paddingLeft: '24px',
            }}>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginTop: '16px',
            }}>
              To exercise any of these rights, email us at <a href="mailto:hello@kantanlabs.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@kantanlabs.com</a>.
            </p>
          </div>

          {/* Changes to Policy */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Changes to This Policy
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              We may update this privacy policy from time to time. When we do, we will update the "Last updated" date at the top of this page. If we make significant changes, we will notify you via email.
            </p>
          </div>

          {/* Contact */}
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '24px',
          }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '12px',
            }}>
              Questions?
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              If you have any questions about this privacy policy or how we handle your data, please contact us at <a href="mailto:hello@kantanlabs.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>hello@kantanlabs.com</a>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
