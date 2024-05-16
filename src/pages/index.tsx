import 'react-horizontal-scrolling-menu/dist/styles.css';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PropertyCard } from '@/card/Card';
import CardSlider from '@/card-slider/CardSlider';
import Discover from '@/discover';
import { Header } from '@/header/header';
import { Meta } from '@/layouts/Meta';
import Promo from '@/promo';
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
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
              surfaceArea={1.6}
              status={index % 3}
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
      <Promo></Promo>
      <Discover></Discover>
      <Footer />
    </div>
  );
};

export default Index;
