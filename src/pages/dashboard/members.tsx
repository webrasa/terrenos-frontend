import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useAuth } from '@/hooks/UseAuth';
import { Section } from '@/layout/Section';
import { getShell } from '@/layout/Shell';
import { TeamTable } from '@/templates/team/TeamTable';
import type { IMember, MemberRole } from '@/types/IMember';

export type IMemberList = {
  list: IMember[];
  role: MemberRole;
};

const Members = () => {
  const { currentTeam } = useAuth();
  const router = useRouter();

  const { data } = useSWR<IMemberList>(
    router.isReady ? `/team/${currentTeam.id}/list-members` : null
  );

  if (!data) {
    return null;
  }

  return (
    <Section>
      <TeamTable list={data.list} role={data.role} />
    </Section>
  );
};

Members.getLayout = getShell('Members');

export default Members;
