// ** Layouts

import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Button } from '@/button/Button';
import Gallery from '@/gallery';
import { LandingSection } from '@/layouts/LandingSection';
import { Meta } from '@/layouts/Meta';
import Map from '@/map';
import { Pill } from '@/pill/Pill';
import PropertyInfo from '@/propertyInfo';
import PropertyTable from '@/propertyTable';
import { useUserLocation } from '@/store/locationContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

import { getStaticPaths, makeStaticProps } from '../../../utils/getStatic';

//* * Utils */

const getStaticProps = makeStaticProps(['common', 'property', 'index']);
export { getStaticPaths, getStaticProps }

const Property = () => {
  const { ipLocation } = useUserLocation();
  // Translations
  const { t: translationCommon } = useTranslation('common');
  const { t: translationProperty } = useTranslation('property');
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title="Get from property"
        description="Get from property"
        image="Get from property, next generate"
      />
      <Navbar translation={translationCommon} />
      <LandingSection yPadding="py-2">
        <Gallery images={images} />
        <PropertyInfo
          username="Mary"
          userProfileImage="https://picsum.photos/200/200"
          longitude={37.3393}
          latitude={-121.894}
          days={12}
          views={15}
          favorites={22}
          title="Lacmiel, 2 cuadras arriba, 1/2 cuadra al sur"
          subtitle="San Jose, Columbia"
          price="$35,000"
          propertyTranslations={translationProperty}
        />
        <div className="mx-auto py-4">
          <h1 className="mb-5 text-2xl font-semibold text-black">
            {translationProperty('descriptionSection.title')}
          </h1>
          <p className="mb-14 text-black">
            {translationProperty('descriptionSection.text')}
          </p>
          <h1 className="my-5 text-2xl font-semibold text-black">
            {translationProperty('propertyAttributesSection.title')}
          </h1>
          <div className="h-96">
            <Map
              showMarkers={true}
              center={{
                latitude: ipLocation.latitude,
                longitude: ipLocation.longitude,
              }}
              markers={[{ latitude: 44.8152453, longitude: 20.42259 }]}
            />
          </div>
          <h1 className="mb-5 mt-14 text-2xl font-semibold text-black">
            {translationProperty('propertyAttributesSection.title')}
          </h1>
          <PropertyTable
            propertyTranslations={translationProperty}
            country="Portugal"
            id="#1234567"
            taxes="$1000 per month"
            city="Sanjose"
            address="Lacmiel, 2 cuadras arriba, 1/2 cuadra al sur"
            longitude={37.3393}
            latitude={-121.894}
            surface={231232}
          />
          <div className="mb-10 mt-5 flex flex-wrap justify-between gap-4">
            {array.map((a) => (
              <Pill key={a} base greenBorder name="PERA"></Pill>
            ))}
          </div>
          <Button full>{translationProperty('contactSellerButton')}</Button>
        </div>
      </LandingSection>
      <Footer />
    </div>
  );
};

export default Property;
