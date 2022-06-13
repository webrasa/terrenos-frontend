import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/UseAuth';
import { SidebarSelect } from '@/shell/SidebarSelect';

enum TeamOption {
  NEW = 'NEW',
}

const SidebarTeamSelection = () => {
  const { teamList, currentTeamInd, setCurrentTeamInd, currentTeam } =
    useAuth();
  const router = useRouter();

  const optionTeamList = teamList
    .concat({
      id: TeamOption.NEW,
      displayName: 'Create new team',
    })
    .map((elt) => ({
      id: elt.id,
      label: elt.displayName,
    }));

  const handleTeamChange = async (teamInd: number) => {
    if (teamInd >= optionTeamList.length - 1) {
      await router.push('/dashboard/create-team');
    } else {
      setCurrentTeamInd(teamInd);
    }
  };

  return (
    <SidebarSelect
      value={currentTeamInd}
      currentLabel={currentTeam.displayName}
      handleChange={handleTeamChange}
      optionList={optionTeamList}
    />
  );
};

export { SidebarTeamSelection };
