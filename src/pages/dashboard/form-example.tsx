import { Section } from '../../layout/Section';
import { getShell } from '../../layout/Shell';
import { RandomForm } from '../../templates/RandomForm';
import { NextPageWithLayout } from '../../utils/NextLayout';

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
