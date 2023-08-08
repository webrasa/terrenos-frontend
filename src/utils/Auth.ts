import type { Team } from '@/types/Auth';
import type { MemberRole } from '@/types/IMember';

export const requiredRoles = (roleList: MemberRole[], role: MemberRole) => {
  return roleList.includes(role);
};

export const findTeamInd = (
  teamList: Team[] | undefined,
  teamId: string | string[] | undefined,
) => teamList?.findIndex((team) => team.id === teamId) || 0;
