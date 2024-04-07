import { CenterSection } from '@/layouts/CenterSection';
import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
import { CreateTeamForm } from '@/templates/team/CreateTeamForm';
import type { NextPageWithLayout } from '@/utils/NextLayout';

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

CreateTeam.getLayout = getShell('New Team');

export default CreateTeam;
