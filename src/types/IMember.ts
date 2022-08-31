export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  READ_ONLY = 'READ_ONLY',
}

// Type for Team member with their information
export type IMember = {
  memberId: string;
  email: string;
  status: MemberStatus;
};
