import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/UseAuth';
import { Select } from '@/select/Select';

enum TeamOption {
  NEW = 'NEW',
}

type ITeamOption = {
  id: string;
  ind: number;
  label: string;
};

/**
 * A <select>-equivalent to choose a team for multi-tenancy or add a new one.
 * @component
 */
const SidebarTeamSelection = () => {
  const { teamList, currentTeamInd, setCurrentTeamInd, currentTeam } =
    useAuth();
  const router = useRouter();

  const optionTeamList: ITeamOption[] = teamList
    .concat({
      id: TeamOption.NEW,
      displayName: 'Create new team',
    })
    .map((elt, ind) => ({
      id: elt.id,
      ind,
      label: elt.displayName,
    }));

  const handleTeamChange = async (team: ITeamOption) => {
    if (team.ind >= optionTeamList.length - 1) {
      await router.push('/dashboard/create-team');
    } else {
      setCurrentTeamInd(team.ind);
    }
  };

  return (
    <Select
      value={{
        id: currentTeam.id,
        label: currentTeam.displayName,
        ind: currentTeamInd,
      }}
      currentLabel={currentTeam.displayName}
      handleChange={handleTeamChange}
      optionList={optionTeamList}
    />
  );
};

export { SidebarTeamSelection };
