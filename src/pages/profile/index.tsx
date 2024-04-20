// ** Layouts
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
import type { NextPageWithLayoutAndProps } from '@/types/Layout';
import type { ProfileTranslations } from '@/types/Translation';

const Index: NextPageWithLayoutAndProps<ProfileTranslations> = ({
  general,
  menuSection,
  inboxSection,
}: ProfileTranslations) => {
  return (
    <Section title={general.title}>
      Translation experiment: {menuSection.currentListingsTitle}{' '}
      {inboxSection.myListingsSubtitle}{' '}
    </Section>
  );
};

Index.getLayout = (page) => {
  const { general } = page.props;

  return getShell({
    title: general.title,
    description: general.description,
    image: 'imageURL',
  })(page);
};

export default Index;
