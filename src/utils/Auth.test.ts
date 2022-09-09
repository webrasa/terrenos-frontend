import { MemberRole } from '@/types/IMember';

import { requiredRoles } from './Auth';

describe('Auth utils', () => {
  describe('Verify roles', () => {
    it('should return false for empty list', () => {
      expect(requiredRoles([], MemberRole.READ_ONLY)).toBeFalsy();
    });

    it('should return false if it is not in the list', () => {
      expect(
        requiredRoles(
          [MemberRole.OWNER, MemberRole.ADMIN],
          MemberRole.READ_ONLY
        )
      ).toBeFalsy();
    });

    it('should return true when the user match the required role', () => {
      expect(
        requiredRoles([MemberRole.OWNER, MemberRole.ADMIN], MemberRole.ADMIN)
      ).toBeTruthy();
    });
  });
});
