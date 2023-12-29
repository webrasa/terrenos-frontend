import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getAdminShell } from '@/layouts/AdminShell';
import { Section } from '@/layouts/Section';
import { TeamDetailsTable } from '@/templates/admin/TeamDetailsTable';
import type { IAdminMemberList } from '@/types/Admin';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const TeamDetails: NextPageWithLayout = () => {
  const router = useRouter();

  const { data } = useSWR<IAdminMemberList>(
    router.isReady ? `/super-admin/team/${router.query.id}` : null,
  );

  if (!data) {
    return null;
  }

  return (
    <Section>
      <TeamDetailsTable memberList={data} />
    </Section>
  );
};

TeamDetails.getLayout = getAdminShell('Team Details');

export default TeamDetails;
