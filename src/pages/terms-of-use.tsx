import { Background } from '@/background/Background';
import { Meta } from '@/layouts/Meta';
import { Section } from '@/layouts/Section';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';

const TermsOfUse = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Navbar />
    <Background color="bg-primary-100">
      <Section>
        <div className="prose mx-auto max-w-5xl rounded-sm bg-white py-12 px-4 shadow-md sm:px-16">
          <h1>EXAMPLE TERMS OF SERVICE - NEED TO UPDATE</h1>
          <p>Effective date: XX/XX/20XX</p>
          <h2>Communications</h2>

          <p>
            By creating an Account on our Service, you agree to subscribe to
            newsletters, marketing or promotional materials and other
            information we may send. However, you may opt out of receiving any,
            or all, of these communications from us by following the unsubscribe
            link or by emailing at.
          </p>

          <h2>Contests, Sweepstakes and Promotions</h2>

          <p>
            Any contests, sweepstakes or other promotions (collectively, “
            <b>Promotions</b>
            ”) made available through Service may be governed by rules that are
            separate from these Terms of Service. If you participate in any
            Promotions, please review the applicable rules as well as our
            Privacy Policy. If the rules for a Promotion conflict with these
            Terms of Service, Promotion rules will apply.
          </p>

          <h2>Refunds</h2>

          <p>
            Except when required by law, paid license are non-refundable due to
            the nature of the software being non-returnable.
          </p>
        </div>
      </Section>
    </Background>
    <Footer />
  </div>
);

export default TermsOfUse;
