import type { ISelectOption } from '@/select/Select';

import { MemberRole, MemberRoleLabel } from './IMember';

// List of action possible in team member listing.
export enum TeamMembersActionType {
  NONE = 'NONE',
  INVITE_MEMBER = 'INVITE_MEMBER',
  EDIT_MEMBER = 'EDIT_MEMBER',
  REMOVE_MEMBER = 'REMOVE_MEMBER',
  TRANSFER_OWNERSHIP = 'TRANSFER_OWNERSHIP',
}

export const RoleOptionList: ISelectOption[] = [
  { id: MemberRole.ADMIN, label: MemberRoleLabel[MemberRole.ADMIN] },
  { id: MemberRole.READ_ONLY, label: MemberRoleLabel[MemberRole.READ_ONLY] },
];

interface INone {
  type: TeamMembersActionType.NONE;
}

interface IInviteMember {
  type: TeamMembersActionType.INVITE_MEMBER;
}

interface IEditMember {
  type: TeamMembersActionType.EDIT_MEMBER;
  memberId: string;
  role: MemberRole;
}

interface IRemoveMember {
  type: TeamMembersActionType.REMOVE_MEMBER;
  memberId: string;
}

interface ITransferOwnership {
  type: TeamMembersActionType.TRANSFER_OWNERSHIP;
}

// Tracking Action in team member listing.
// `Action` is like `State` but also need to track parameters like `memberId` and `status`.
export type TeamMembersAction =
  | INone
  | IInviteMember
  | IEditMember
  | IRemoveMember
  | ITransferOwnership;
