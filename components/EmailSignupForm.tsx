'use client';

import { useState } from 'react';

export default function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks! Check your email for your Founders link.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      {/* Eyebrow */}
      <div style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginTop: '3px',
        marginBottom: '16px',
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
        For early access
      </div>

      {/* Form Title */}
      <h3 style={{
        fontFamily: "'Shippori Mincho', serif",
        fontSize: '24px',
        fontWeight: 700,
        color: 'var(--ink)',
        marginBottom: '12px',
        lineHeight: 1.2,
      }}>
        Kantan Labs
      </h3>

      {/* Subtext */}
      <p style={{
        fontSize: '15px',
        color: 'var(--muted)',
        marginBottom: '20px',
        lineHeight: 1.5,
        fontWeight: 300,
      }}>
        $9/month forever. No credit card needed to get started.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '12px' }}>
        <div style={{
          display: 'flex',
          gap: '0',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          overflow: 'hidden',
          background: 'var(--white)',
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading' || status === 'success'}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: 'none',
              fontSize: '15px',
              color: 'var(--ink)',
              background: 'transparent',
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            style={{
              padding: '12px 24px',
              background: status === 'success' ? 'var(--accent)' : 'var(--accent)',
              color: 'var(--white)',
              border: 'none',
              fontSize: '14px',
              fontWeight: 500,
              cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              opacity: status === 'loading' ? 0.7 : 1,
              letterSpacing: '0.03em',
            }}
            onMouseOver={(e) => {
              if (status === 'idle' || status === 'error') {
                e.currentTarget.style.background = 'var(--accentL)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--accent)';
            }}
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Get early access'}
          </button>
        </div>
      </form>

      {/* Status Message */}
      {message && (
        <p style={{
          fontSize: '13px',
          color: status === 'success' ? 'var(--accent)' : '#d32f2f',
          marginTop: '8px',
          lineHeight: 1.4,
        }}>
          {message}
        </p>
      )}
    </div>
  );
}
