// ** Layouts
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

const Index: NextPageWithLayout = () => {
  return <Section title="Search">Search</Section>;
};

Index.getLayout = getShell({
  title: 'Search',
  description: 'This is search description',
  image: 'imageURL',
});

export default Index;
