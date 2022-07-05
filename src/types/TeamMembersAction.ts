import type { MemberStatus } from './IMember';

// List of action possible in team member listing.
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

// Tracking Action in team member listing.
// `Action` is like `State` but also need to track parameters like `memberId` and `status`.
export type TeamMembersAction = INone | IInviteMember | IRemoveMember;
