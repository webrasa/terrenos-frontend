export enum TeamMembersActionType {
  NONE = 'NONE',
  INVITE_MEMBER = 'INVITE_MEMBER',
}

interface INone {
  type: TeamMembersActionType.NONE;
}

interface IInviteMember {
  type: TeamMembersActionType.INVITE_MEMBER;
}

export type TeamMembersAction = INone | IInviteMember;
