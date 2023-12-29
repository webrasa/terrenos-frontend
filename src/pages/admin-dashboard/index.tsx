import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getAdminShell } from '@/layouts/AdminShell';
import { Section } from '@/layouts/Section';
import { Charts } from '@/templates/admin/Charts';
import type { IStats } from '@/templates/admin/Stats';
import { Stats } from '@/templates/admin/Stats';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const Index: NextPageWithLayout = () => {
  const router = useRouter();

  const { data } = useSWR<IStats>(router.isReady ? `/super-admin/stats` : null);

  if (!data) {
    return null;
  }

  return (
    <>
      <Section>
        <Stats {...data} />
      </Section>
      <Section>
        <Charts revenue={data.revenue} />
      </Section>
    </>
  );
};

Index.getLayout = getAdminShell('Admin Dashboard');

export default Index;
