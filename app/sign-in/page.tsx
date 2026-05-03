import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--paper)',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '480px',
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        <h1 style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '12px',
        }}>Sign in to Kantan</h1>
        <p style={{
          fontSize: '15px',
          color: 'var(--muted)',
          lineHeight: 1.6,
        }}>
          We'll send you a magic link to sign in. No password needed.
        </p>
      </div>
      
      <SignIn 
        routing="hash"
        fallbackRedirectUrl="/demo"
        signUpFallbackRedirectUrl="/demo"
      />
    </div>
  );
}
