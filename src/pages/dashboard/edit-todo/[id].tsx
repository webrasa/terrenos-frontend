import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';

import { useAuth } from '@/hooks/UseAuth';
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
import { TodoForm } from '@/templates/TodoForm';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const EditTodo: NextPageWithLayout = () => {
  const { currentTeam } = useAuth();
  const router = useRouter();

  const { data } = useSWR(
    router.isReady ? `/${currentTeam.id}/todo/${router.query.id}` : null
  );

  if (!data) {
    return null;
  }

  // Need to use `as string` because router.query can return a string or an array of string.
  return (
    <Section
      title="Title Edit Todo page form"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at metus dictum, vulputate tellus eu, feugiat sem. Ut porta erat pharetra dui commodo lobortis."
    >
      <TodoForm id={router.query.id as string} defaultValues={data} />
    </Section>
  );
};

EditTodo.getLayout = getShell('Edit Todo');

export default EditTodo;
