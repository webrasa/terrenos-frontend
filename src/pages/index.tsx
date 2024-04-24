import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layouts/Meta';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';

import { Header } from '@/header/header';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index'])),
    },
  };
}
const Index = () => {
  const { t } = useTranslation('index');
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar />
      <Header/>
      {t('general.title')}
      <Footer />
    </div>
  );
};

export default Index;
