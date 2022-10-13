import { Meta } from '@/layouts/Meta';
import { Banner } from '@/templates/Banner';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Testimonial } from '@/templates/Testimonial';
import { VerticalFeatures } from '@/templates/VerticalFeatures';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Navbar />
    <Hero />
    <Features />
    <VerticalFeatures />
    <Testimonial />
    <Pricing />
    <FAQ />
    <Banner />
    <Footer />
  </div>
);

export default Index;
