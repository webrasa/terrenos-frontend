export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export type IMember = {
  memberId: string;
  email: string;
  status: MemberStatus;
};
