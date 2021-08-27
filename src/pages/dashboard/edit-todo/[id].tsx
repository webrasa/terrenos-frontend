import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';

import { Section } from '../../../layout/Section';
import { getShell } from '../../../layout/Shell';
import { TodoForm } from '../../../templates/TodoForm';
import { NextPageWithLayout } from '../../../utils/NextLayout';

const EditTodo: NextPageWithLayout = () => {
  const router = useRouter();

  const { data } = useSWR(router.isReady ? `/todo/${router.query.id}` : null);

  if (!data) {
    return null;
  }

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
