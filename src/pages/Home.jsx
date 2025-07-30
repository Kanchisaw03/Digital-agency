import HeroSection from '../components/HeroSection';
import ServicesPreview from '../components/ServicesPreview';
import ImpactMetrics from '../components/ImpactMetrics';
import ClientCarousel from '../components/ClientCarousel';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <HeroSection />
        <ServicesPreview />
        <ImpactMetrics />
        <ClientCarousel />
        <Testimonials />
        <ContactSection />
      </div>
    </main>
  );
} 