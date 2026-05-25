'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main>
      <Nav />
      
      {/* Terms Hero */}
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
          Terms of Service
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
          
          {/* Introduction */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontSize: '16px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              Welcome to Kantan Labs. By using our service, you agree to these terms. Please read them carefully. If you do not agree with these terms, you may not use Kantan.
            </p>
          </div>

          {/* Using Kantan */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Using Kantan
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              You may use Kantan to generate user stories, acceptance criteria, and related product management content. You are responsible for:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              paddingLeft: '24px',
            }}>
              <li>Maintaining the security of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Ensuring your use complies with all applicable laws</li>
              <li>The content you generate using our service</li>
            </ul>
          </div>

          {/* Acceptable Use */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF5EB 0%, #FFE8D6 100%)',
            border: '2px solid var(--accent)',
            borderRadius: '8px',
            padding: '32px',
            marginBottom: '40px',
          }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Acceptable Use Policy
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--ink)',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              We trust you to use Kantan responsibly. Do not use Kantan to:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--ink)',
              lineHeight: 1.8,
              paddingLeft: '24px',
            }}>
              <li>Violate any laws or regulations</li>
              <li>Abuse, harass, or harm others</li>
              <li>Distribute malware or engage in phishing</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Scrape, data mine, or reverse engineer our service</li>
              <li>Share your account credentials with others</li>
              <li>Circumvent usage limits or billing</li>
            </ul>
            <p style={{
              fontSize: '15px',
              color: 'var(--ink)',
              lineHeight: 1.7,
              marginTop: '16px',
              fontWeight: 500,
            }}>
              If you attempt to do bad things, we will ban your account and revoke your membership. No exceptions.
            </p>
          </div>

          {/* Subscription & Billing */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Subscription and Billing
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              Kantan offers both Free and paid subscription tiers:
            </p>
            <ul style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              paddingLeft: '24px',
              marginBottom: '12px',
            }}>
              <li><strong>Free Tier:</strong> 3 user stories per week at no cost</li>
              <li><strong>Solo Tier:</strong> 200 user stories per month for $19/month</li>
              <li><strong>Founding Tier:</strong> Grandfathered pricing for early supporters at $9/month</li>
            </ul>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              All subscriptions are billed monthly and will automatically renew unless you cancel. You may cancel your subscription at any time through your account settings or by contacting us at hello@kantanlabs.com.
            </p>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              We reserve the right to change our pricing at any time. If we increase prices for existing paid subscribers, we will provide at least 30 days notice before the change takes effect.
            </p>
          </div>

          {/* Refunds */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Refund Policy
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              All sales are final. We do not offer refunds for subscription fees. If you cancel your subscription, you will retain access to paid features until the end of your current billing period.
            </p>
          </div>

          {/* Service Availability */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Service Availability
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              We strive to provide reliable service, but Kantan is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or completely secure. We may modify, suspend, or discontinue any part of the service at any time.
            </p>
          </div>

          {/* Content Ownership */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Content Ownership
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              You own the content you generate using Kantan. We do not claim any ownership rights to your user stories, acceptance criteria, or other output. However, by using Kantan, you grant us a limited license to store and process your content to provide the service and improve our product.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Limitation of Liability
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              To the maximum extent permitted by law, Kantan Labs LLC and its team members will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability to you for any claims related to Kantan will not exceed the amount you paid us in the past 12 months.
            </p>
          </div>

          {/* Account Termination */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Account Termination
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              You may close your account at any time by contacting us at hello@kantanlabs.com. We reserve the right to suspend or terminate your account if we believe you have violated these terms, engaged in fraudulent activity, or abused the service.
            </p>
          </div>

          {/* Changes to Terms */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}>
              Changes to These Terms
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}>
              We may update these terms from time to time. When we do, we will update the "Last updated" date at the top of this page. Your continued use of Kantan after changes are posted constitutes your acceptance of the updated terms.
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
              Questions About These Terms?
            </h3>
            <p style={{
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              If you have questions about these terms of service, please contact us at <a href="mailto:hello@kantanlabs.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>hello@kantanlabs.com</a>.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
