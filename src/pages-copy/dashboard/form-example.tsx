import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
import { RandomForm } from '@/templates/RandomForm';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const FormExample: NextPageWithLayout = () => (
  <Section
    title="Random form for design example"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at metus dictum, vulputate tellus eu, feugiat sem. Ut porta erat pharetra dui commodo lobortis."
  >
    <RandomForm />
  </Section>
);

FormExample.getLayout = getShell('Random Form');

export default FormExample;
