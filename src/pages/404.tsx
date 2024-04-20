// ** Layouts
import { Section } from '@/layouts/Section';
import type { NotFoundTranslations } from '@/types/Translation';
//* * Utils */

const Index = ({ notFound }: NotFoundTranslations) => {
  return <Section>404 {notFound}</Section>;
};

export default Index;
