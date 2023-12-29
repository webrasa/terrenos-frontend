import type { MemberRole, MemberStatus } from './IMember';

export type ITeam = {
  id: string;
  displayName: string;
  planId: string;
  planName: string;
};

export type ITeamList = {
  teamList: ITeam[];
  paginationToken?: string;
};

type IMember = {
  memberId: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
};

export type IAdminMemberList = {
  name: string;
  memberList: IMember[];
};

export type IUser = {
  username: string;
  email: string;
  createDate: string;
  enabled: boolean;
};

export type IUserList = {
  userList: IUser[];
  paginationToken?: string;
};
