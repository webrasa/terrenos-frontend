import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layouts/Meta';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';
import { PropertyCard } from '@/card/Card';

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
      {t('general.title')}

      <PropertyCard
        price={'$55,000'}
        sizeMeters={1.6}
        sizeAcres={2.6}
        location={'Alajuela provincia, Alajuela, Carrizal Costa'}
        secondLocation={'Rica, Alajuela provincia'}
        images={['https://picsum.photos/200/300', 'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg', 'https://picsum.photos/200/300']}
      />
      <PropertyCard
        price={'$55,000'}
        sizeMeters={1.6}
        sizeAcres={2.6}
        location={'Alajuela provincia, Alajuela, Carrizal Costa'}
        secondLocation={'Rica, Alajuela provincia'}
        images={['https://picsum.photos/200/300', 'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg', 'https://picsum.photos/200/300']}
        showDropdown={true}
        showEditButton={true}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
