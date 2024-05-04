import 'react-horizontal-scrolling-menu/dist/styles.css';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PropertyCard } from '@/card/Card';
import CardSlider from '@/card-slider/CardSlider';
import Filter from '@/filter/filter';
import { Header } from '@/header/header';
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
const Index = () => {
  const { t } = useTranslation('index');
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar />
      <Header indexTranslations={t} />
      <CardSlider>
        {array.map((item, index) => {
          return (
            <PropertyCard
              key={index}
              id={index.toString()}
              price={'$55,000'}
              sizeMeters={1.6}
              sizeAcres={2.6}
              location={'Alajuela provincia, Alajuela, Carrizal Costa'}
              secondLocation={'Rica, Alajuela provincia'}
              images={[
                'https://picsum.photos/200/300',
                'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                'https://picsum.photos/200/300',
              ]}
            />
          );
        })}
      </CardSlider>
      <Filter />
      <Footer />
    </div>
  );
};

export default Index;
