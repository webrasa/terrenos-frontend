import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useAuth } from '@/hooks/UseAuth';
import { Section } from '@/layout/Section';
import { getShell } from '@/layout/Shell';
import { TeamTable } from '@/templates/team/TeamTable';
import type { IMember } from '@/types/IMember';

type IResponse = {
  list: IMember[];
};

const Members = () => {
  const { currentTeam } = useAuth();
  const router = useRouter();

  const { data } = useSWR<IResponse>(
    router.isReady ? `/team/${currentTeam.id}/list-members` : null
  );

  if (!data) {
    return null;
  }

  return (
    <Section>
      <TeamTable list={data.list} />
    </Section>
  );
};

Members.getLayout = getShell('Members');

export default Members;
