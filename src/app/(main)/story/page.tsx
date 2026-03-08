import type { Metadata } from 'next';
import StoryTimeline from '@/components/sections/StoryTimeline';

export const metadata: Metadata = {
  title: 'My Story — Allan Kisuule',
  description:
    'Kampala → Berlin → Oslo. How an IT degree, a bootcamp, and 26+ websites built an AI engineer. The full story of Allan Kisuule and Echo Algori Data.',
  openGraph: {
    title: 'My Story — Allan Kisuule',
    description:
      'Kampala → Berlin → Oslo. Fullstack Developer, AI Engineer, DJ Demure.',
    type: 'website',
  },
};

/**
 * /story — Server component wrapper.
 * Renders StoryTimeline (client) which handles scroll-driven chapter transitions.
 */
export default function StoryPage() {
  return (
    <main>
      <StoryTimeline />
    </main>
  );
}
