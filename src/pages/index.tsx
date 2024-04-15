import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layouts/Meta';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index'])),
    },
  };
}
const Index = () => (
  <div className="text-gray-600 antialiased">
    <Meta
      title={AppConfig.title}
      description={AppConfig.description}
      image={'imageURL'}
    />
    <Navbar />
    Main page
    <Footer />
  </div>
);

export default Index;
