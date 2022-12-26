import { Background } from '@/background/Background';
import { Meta } from '@/layouts/Meta';
import { Section } from '@/layouts/Section';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';

const PrivacyPolicy = () => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Navbar />
    <Background color="bg-primary-100">
      <Section>
        <div className="prose mx-auto max-w-5xl rounded-sm bg-white py-12 px-4 shadow-md sm:px-16">
          <h1>EXAMPLE PRIVACY POLICY - NEED TO UPDATE</h1>
          <p>Effective date: XX/XX/20XX</p>
          <h2>Information Collection and Use</h2>

          <p>
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>

          <h2>Types of Data Collected</h2>

          <h3>Personal Data</h3>

          <p>
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you (“
            <b>Personal Data</b>
            ”). Personally identifiable information may include, but is not
            limited to:
          </p>

          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Cookies and Usage Data</li>
          </ul>

          <p>
            We may use your Personal Data to contact you with newsletters,
            marketing or promotional materials and other information that may be
            of interest to you. You may opt out of receiving any, or all, of
            these communications from us by following the unsubscribe link.
          </p>
        </div>
      </Section>
    </Background>
    <Footer />
  </div>
);

export default PrivacyPolicy;
