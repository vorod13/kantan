import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Kantan — User Story Generator for Product Managers',
  description: 'Kantan turns a rough idea into a prioritized user story with acceptance criteria, RICE scoring, and a measurement plan in under 30 seconds. Built for product managers.',
  authors: [{ name: 'Kantan Labs' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: 'website',
    url: 'https://kantanlabs.com/',
    title: 'Kantan — User Story Generator for Product Managers',
    description: 'Generate a complete user story, AC, RICE score, and measurement plan in under 30 seconds. Built for PMs who ship.',
    images: [
      {
        url: 'https://kantanlabs.com/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kantan — User Story Generator for Product Managers',
    description: 'Generate a complete user story, AC, RICE score, and measurement plan in under 30 seconds.',
    images: ['https://kantanlabs.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://kantanlabs.com',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23C8410A'/><text x='50%' y='50%' font-size='18' text-anchor='middle' dominant-baseline='central' font-family='serif' fill='white'>か</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
          <meta name="CCBot" content="noindex, nofollow" />
          <meta name="GPTBot" content="noindex, nofollow" />
          <meta name="ClaudeBot" content="noindex, nofollow" />
          <meta name="PerplexityBot" content="noindex, nofollow" />
          <meta name="ai" content="noai" />
          <meta name="noai" content="true" />
        </head>
        <body style={{
          position: 'relative',
        }}>
          {/* Subtle CSS noise texture overlay */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: 0.04,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.03) 2px,
              rgba(0, 0, 0, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.03) 2px,
              rgba(0, 0, 0, 0.03) 4px
            )`,
          }} />
          {children}
          <Analytics />
          <GoogleAnalytics gaId="G-JVF45FMR3Y" />
        </body>
      </html>
    </ClerkProvider>
  );
}
