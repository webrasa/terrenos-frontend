import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Button } from '../../button/Button';
import { useAuth } from '../../hooks/UseAuth';
import { Section } from '../../layout/Section';
import { getShell } from '../../layout/Shell';
import { MessageState } from '../../message/MessageState';
import { Table } from '../../templates/Table';
import type { ITodo } from '../../types/ITodo';
import type { NextPageWithLayout } from '../../utils/NextLayout';
import { getSessionStorage } from '../../utils/SessionStorage';

type IResponse = {
  list: ITodo[];
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
        <Link href="/dashboard/add-todo">
          <a>
            <Button>Add Todo</Button>
          </a>
        </Link>
      }
    >
      <Section>
        <Table list={data.list} />
      </Section>
    </MessageState>
  );
};

// Shared layout for Dashboard pages: https://nextjs.org/docs/basic-features/layouts
Index.getLayout = getShell('Dashboard');

export default Index;
