import type { Metadata } from 'next';
import LandingPageContent from './LandingPageContent';

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

export default function Home() {
  return <LandingPageContent />;
}
