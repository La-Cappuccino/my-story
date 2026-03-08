import HeroSection from '@/components/sections/HeroSection';
import StoryTeaser from '@/components/sections/StoryTeaser';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import MetricsBar from '@/components/sections/MetricsBar';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

/**
 * Home — server component
 * Assembles all landing page sections in order.
 */
export default function Home() {
  return (
    <main>
      {/* Full-viewport hero with animated headline + globe placeholder */}
      <HeroSection />

      {/* Count-up metrics strip */}
      <MetricsBar />

      {/* 3-chapter story teaser cards */}
      <StoryTeaser />

      {/* Bento grid of top 3 live products */}
      <FeaturedProjects />

      {/* Auto-scrolling testimonial marquee */}
      <Testimonials />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
