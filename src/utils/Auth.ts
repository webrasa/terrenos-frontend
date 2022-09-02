import type { MemberRole } from '@/types/IMember';

export const requiredRoles = (roleList: MemberRole[], role: MemberRole) => {
  return roleList.includes(role);
};
