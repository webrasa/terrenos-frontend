import Link from 'next/link';
import useSWR from 'swr';

import { Button } from '../../button/Button';
import { Section } from '../../layout/Section';
import { getShell } from '../../layout/Shell';
import { Table } from '../../templates/Table';
import { ZeroState } from '../../templates/ZeroState';
import { ITodo } from '../../types/ITodo';
import { NextPageWithLayout } from '../../utils/NextLayout';

type IResponse = {
  list: ITodo[];
};

// TODO: Rename ZeroState to MessageState
const Index: NextPageWithLayout = () => {
  const { data } = useSWR<IResponse>('/todo/list');

  if (!data) {
    return null;
  }

  return (
    <ZeroState
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
    </ZeroState>
  );
};

Index.getLayout = getShell('Dashboard');

export default Index;
