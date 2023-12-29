import { usePaginationToken } from '@/hooks/UsePaginationToken';
import { getAdminShell } from '@/layouts/AdminShell';
import { Section } from '@/layouts/Section';
import { PaginationToken } from '@/navigation/PaginationToken';
import { TeamListTable } from '@/templates/admin/TeamListTable';
import type { ITeamList } from '@/types/Admin';

const TeamList = () => {
  const { data, prevTokenList, handleNextPage, handlePreviousPage } =
    usePaginationToken<ITeamList>('/super-admin/list-teams');

  if (!data) {
    return null;
  }

  return (
    <Section>
      <TeamListTable teamList={data.teamList} />

      <PaginationToken
        paginationToken={data.paginationToken}
        prevTokenList={prevTokenList}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </Section>
  );
};

TeamList.getLayout = getAdminShell('Team List');

export default TeamList;
