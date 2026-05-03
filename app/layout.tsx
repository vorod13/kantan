import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Kantan — Specs, simplified.',
  description: 'Kantan turns a rough idea into a prioritized user story with acceptance criteria, RICE scoring, and a measurement plan in under 30 seconds. Built for product managers.',
  authors: [{ name: 'The Kantan Company' }],
  openGraph: {
    type: 'website',
    url: 'https://thekantancompany.com/',
    title: 'Kantan — Specs, simplified.',
    description: 'Generate a complete user story, AC, RICE score, and measurement plan in under 30 seconds. Built for PMs who ship.',
    images: [
      {
        url: 'https://thekantancompany.com/og-image.png',
      },
    ],
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
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
