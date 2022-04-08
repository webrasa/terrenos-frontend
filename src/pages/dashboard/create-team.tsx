import { CenterSection } from '../../layout/CenterSection';
import { Section } from '../../layout/Section';
import { getShell } from '../../layout/Shell';
import { CreateTeamForm } from '../../templates/team/CreateTeamForm';
import { NextPageWithLayout } from '../../utils/NextLayout';

const CreateTeam: NextPageWithLayout = () => (
  <CenterSection>
    <div className="w-full max-w-screen-sm">
      <Section
        title="Create new team"
        description="A dedicated space for your team to edit, share and manage Todo list."
      >
        <CreateTeamForm />
      </Section>
    </div>
  </CenterSection>
);

CreateTeam.getLayout = getShell('New team');

export default CreateTeam;
