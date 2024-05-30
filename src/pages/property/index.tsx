// ** Layouts

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Button } from '@/button/Button';
import MyGallery from '@/gallery/myGallery';
import { LandingSection } from '@/layouts/LandingSection';
import { Meta } from '@/layouts/Meta';
import { Pill } from '@/pill/Pill';
import SectionProperty from '@/sectionProperty';
import TableProperty from '@/tableProperty';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';
//* * Utils */

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'property',
        'common',
        'index',
      ])),
    },
  };
}

const Property = () => {
  // Translations
  const { t } = useTranslation('index');
  const { t: translationCommon } = useTranslation('common');
  const { t: translationProperty } = useTranslation('property');
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar translation={translationCommon} />
      <LandingSection yPadding="py-2">
        <MyGallery />
        <SectionProperty
          title={translationProperty('sectionProperty.place')}
          subtitle={translationProperty('sectionProperty.town')}
        />
        <div className="mx-auto py-4">
          <h1 className="mb-5 text-2xl font-semibold text-black">
            Description
          </h1>
          <p className="mb-5 text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem IpsumLorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum
          </p>
          <h1 className="my-5 text-2xl font-semibold text-black">
            Property specs and Attributes
          </h1>
          <TableProperty />
          <div className="mb-10 mt-5 flex flex-wrap justify-between gap-4">
            {array.map((a) => (
              <Pill key={a} base greenBorder name="PERA"></Pill>
            ))}
          </div>
          <Button full>Contact Seller</Button>
        </div>
      </LandingSection>
      <Footer />
    </div>
  );
};

export default Property;
