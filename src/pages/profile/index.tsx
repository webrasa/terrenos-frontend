// ** Layouts
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

const Index: NextPageWithLayout = () => {
  return <Section title="Profile">Profile</Section>;
};

Index.getLayout = getShell({
  title: 'Profile',
  description: 'This is profile description',
  image: 'imageURL',
});

export default Index;
