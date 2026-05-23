'use client';

import { useEffect, useState } from 'react';

interface FirstTimeBannerProps {
  onTryExample: () => void;
  onDismiss: () => void;
}

export default function FirstTimeBanner({ onTryExample, onDismiss }: FirstTimeBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the banner before
    const hasSeenBanner = localStorage.getItem('hasSeenInterstitial');
    
    if (!hasSeenBanner) {
      setIsVisible(true);
    }
  }, []);

  const handleTryExample = () => {
    localStorage.setItem('hasSeenInterstitial', 'true');
    setIsVisible(false);
    onTryExample();
  };

  const handleDismiss = () => {
    localStorage.setItem('hasSeenInterstitial', 'true');
    setIsVisible(false);
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FFF5EB 0%, #FFE8D6 100%)',
        border: '1px solid #F5C6A5',
        borderRadius: '8px',
        padding: '20px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 2px 8px rgba(196, 77, 23, 0.08)',
      }}
    >
      {/* Left: Message */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            First time here?
          </h3>
        </div>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Click the button and watch Kantan in action
        </p>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleTryExample}
          style={{
            padding: '10px 20px',
            background: 'var(--accent)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(196, 77, 23, 0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Try an example
        </button>

        {/* Dismiss X */}
        <button
          onClick={handleDismiss}
          style={{
            padding: '8px',
            background: 'transparent',
            border: 'none',
            color: 'var(--muted)',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--ink)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--muted)';
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
