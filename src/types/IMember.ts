export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export const MemberStatusLabel = {
  [MemberStatus.ACTIVE]: 'Active',
  [MemberStatus.PENDING]: 'Pending',
};

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  READ_ONLY = 'READ_ONLY',
}

export const MemberRoleLabel = {
  [MemberRole.OWNER]: 'Owner',
  [MemberRole.ADMIN]: 'Admin',
  [MemberRole.READ_ONLY]: 'Read only',
};

// Type for Team member with their information
export type IMember = {
  memberId: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
};
