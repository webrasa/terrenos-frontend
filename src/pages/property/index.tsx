// ** Layouts
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

const Index: NextPageWithLayout = () => {
  return <Section title="Property">Property</Section>;
};

Index.getLayout = getShell({
  title: 'Property',
  description: 'This is property description',
  image: 'imageURL',
});

export default Index;
