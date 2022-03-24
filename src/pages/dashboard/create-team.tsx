import { CenterSection } from '../../layout/CenterSection';
import { Section } from '../../layout/Section';
import { getShell } from '../../layout/Shell';
import { NextPageWithLayout } from '../../utils/NextLayout';

const CreateTeam: NextPageWithLayout = () => (
  <CenterSection>
    <div className="max-w-screen-sm">
      <Section
        title="Create new team"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at metus dictum, vulputate tellus eu, feugiat sem. Ut porta erat pharetra dui commodo lobortis."
      >
        New
      </Section>
    </div>
  </CenterSection>
);

CreateTeam.getLayout = getShell('New team');

export default CreateTeam;
