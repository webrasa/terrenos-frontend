// ** Layouts
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['search'])),
    },
  };
}

const Index: NextPageWithLayout = () => {
  return <Section title="Profile">Profile</Section>;
};

Index.getLayout = getShell({
  title: 'Profile',
  description: 'This is profile description',
  image: 'imageURL',
});

export default Index;
