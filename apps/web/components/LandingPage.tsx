import { MotionConfig } from 'motion/react';
import Footer from './Footer';
import AppStory from './site/AppStory';
import DownloadCta from './site/DownloadCta';
import Faq from './site/Faq';
import Hero from './site/Hero';
import HowItWorks from './site/HowItWorks';
import SiteHeader from './site/SiteHeader';
import TrustSection from './site/TrustSection';
import VideoTour from './site/VideoTour';

const KEYWORDS = [
  'Plantões em todo o Brasil',
  'CRM verificado',
  'Mapa de plantões',
  'Chat entre médicos',
  'Agenda integrada',
  'Pagamento garantido',
  'Pix e cartão em até 6x',
  'Todas as especialidades',
];

function KeywordStrip() {
  const items = [...KEYWORDS, ...KEYWORDS];
  return (
    <div className="overflow-hidden border-y border-line bg-white py-4" aria-hidden>
      <div className="animate-marquee gap-10">
        {items.map((k, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm font-semibold whitespace-nowrap text-ink/70">
            {k}
            <span className="h-1.5 w-1.5 rounded-full bg-cross" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full overflow-x-clip bg-mist font-sans text-ink selection:bg-cyan/30">
        <SiteHeader />
        <main>
          <Hero />
          <KeywordStrip />
          <VideoTour />
          <AppStory />
          <TrustSection />
          <HowItWorks />
          <Faq />
          <DownloadCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
