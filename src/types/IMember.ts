export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

// Type for Team member with their information
export type IMember = {
  memberId: string;
  email: string;
  status: MemberStatus;
};
