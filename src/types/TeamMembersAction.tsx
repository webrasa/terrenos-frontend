import type { MemberStatus } from './IMember';

export enum TeamMembersActionType {
  NONE = 'NONE',
  INVITE_MEMBER = 'INVITE_MEMBER',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
}

interface INone {
  type: TeamMembersActionType.NONE;
}

interface IInviteMember {
  type: TeamMembersActionType.INVITE_MEMBER;
}

interface IRemoveMember {
  type: TeamMembersActionType.REMOVE_MEMBER;
  memberId: string;
  status: MemberStatus;
}

export type TeamMembersAction = INone | IInviteMember | IRemoveMember;
