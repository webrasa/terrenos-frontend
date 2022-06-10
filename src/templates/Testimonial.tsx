import { Background } from '@/background/Background';
import { LandingSection } from '@/layout/LandingSection';
import { TestimonialCard } from '@/testimonial/TestimonialCard';

const Testimonial = () => (
  <Background color="bg-primary-100">
    <LandingSection title="Customer's Review" subtitle="Testimonials">
      <div className="lg:mx-48">
        <TestimonialCard
          image={{
            src: '/assets/images/avatar.png',
            alt: 'Random name avatar alt text',
          }}
          author={{
            name: 'Jennifer Ford',
            position: 'CEO of Something',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          nunc elit, ornare in rhoncus eget, rhoncus hendrerit nibh. Nulla non
          purus quis purus consequat ultricies. Quisque finibus sem turpis, sit
          amet interdum metus aliquet vitae. Donec dictum tempus ipsum sed
          consectetur. Vestibulum tristique facilisis faucibus.
        </TestimonialCard>
      </div>
    </LandingSection>
  </Background>
);

export { Testimonial };
