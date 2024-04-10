import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
import { TodoForm } from '@/templates/TodoForm';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const AddTodo: NextPageWithLayout = () => (
  <Section
    title="Title Add Todo page form"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at metus dictum, vulputate tellus eu, feugiat sem. Ut porta erat pharetra dui commodo lobortis."
  >
    <TodoForm />
  </Section>
);

AddTodo.getLayout = getShell('Add Todo');

export default AddTodo;
