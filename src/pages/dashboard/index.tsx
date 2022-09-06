import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Button } from '@/button/Button';
import { useAuth } from '@/hooks/UseAuth';
import { Section } from '@/layout/Section';
import { getShell } from '@/layout/Shell';
import { DisableableLink } from '@/link/DisableableLink';
import { MessageState } from '@/message/MessageState';
import { Table } from '@/templates/Table';
import { UpgradeTooltip } from '@/tooltip/UpgradeTooltip';
import { MemberRole } from '@/types/IMember';
import type { ITodo } from '@/types/ITodo';
import { requiredRoles } from '@/utils/Auth';
import type { NextPageWithLayout } from '@/utils/NextLayout';
import { getSessionStorage } from '@/utils/SessionStorage';

type IResponse = {
  list: ITodo[];
  role: MemberRole;
};

const Index: NextPageWithLayout = () => {
  const { currentTeam } = useAuth();
  const joinTeamPath = getSessionStorage('join-team-path');
  const router = useRouter();
  const { data } = useSWR<IResponse>(`/${currentTeam.id}/todo/list`);

  if (joinTeamPath) {
    // The user has received invite to join a team.
    router.push(`/join/?${joinTeamPath}`);
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <MessageState
      title="Add message here when the list if empty"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu consectetur purus. In laoreet tincidunt libero vitae sagittis."
      shouldDisplay={() => data.list.length === 0}
      cta={
        <UpgradeTooltip
          hideLabel={requiredRoles(
            [MemberRole.OWNER, MemberRole.ADMIN],
            data.role
          )}
        >
          <DisableableLink href="/dashboard/add-todo">
            <Button sm>Add Todo</Button>
          </DisableableLink>
        </UpgradeTooltip>
      }
    >
      <Section>
        <Table list={data.list} role={data.role} />
      </Section>
    </MessageState>
  );
};

// Shared layout for Dashboard pages: https://nextjs.org/docs/basic-features/layouts
Index.getLayout = getShell('Dashboard');

export default Index;
