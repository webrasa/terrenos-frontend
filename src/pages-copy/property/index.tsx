// ** Hooks
// ** Third party components
import useSWR from 'swr';

import { useAuth } from '@/hooks/UseAuth';
// ** Layouts
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
// ** Types
import type { MemberRole } from '@/types/IMember';
import type { ITodo } from '@/types/ITodo';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

type IResponse = {
  list: ITodo[];
  role: MemberRole;
};

const Index: NextPageWithLayout = () => {
  const { currentTeam } = useAuth();
  const { data } = useSWR<IResponse>(`/${currentTeam.id}/todo/list`);

  if (!data) {
    return null;
  }

  return <Section title="Property">Property</Section>;
};

Index.getLayout = getShell('Property');

export default Index;
