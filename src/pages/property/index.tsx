// ** Layouts

import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Button } from '@/button/Button';
import MyGallery from '@/gallery/myGallery';
import { Meta } from '@/layouts/Meta';
import { Pill } from '@/pill/Pill';
import TableProperty from '@/tableProperty';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { Attributes } from '@/types/IComponents';
import { AppConfig } from '@/utils/AppConfig';
//* * Utils */

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['property', 'common'])),
    },
  };
}

type IPropertyProps = {
  attributes: Array<Attributes>;
  translationCommon: Function;
};

const Property = (props: IPropertyProps) => {
  const { t } = useTranslation('index');
  const { t: translationCommon } = useTranslation('common');
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar translation={translationCommon} />
      <MyGallery />
      <div className="mx-auto max-w-screen-xl px-2 py-4 sm:px-5 lg:px-6">
        <div className="w-1/2">
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
          <h1 className="mb-5 text-2xl font-semibold text-black">
            Property specs and Attributes
          </h1>
          <TableProperty />
          <div className="flex flex-wrap justify-evenly gap-4">
            {props.attributes &&
              props.attributes.map((item, index) => {
                return (
                  <Link
                    href={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=&attributes=${item.id}`}
                    key={index}
                  >
                    <Pill
                      translation={props.translationCommon}
                      base
                      greenBorder
                      name={item.name}
                    ></Pill>
                  </Link>
                );
              })}
          </div>
          <Button full>Contact Seller</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Property;
