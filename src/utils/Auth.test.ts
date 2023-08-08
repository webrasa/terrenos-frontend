import { MemberRole } from '@/types/IMember';

import { findTeamInd, requiredRoles } from './Auth';

describe('Auth utils', () => {
  describe('Verify roles', () => {
    it('should return false for empty list', () => {
      expect(requiredRoles([], MemberRole.READ_ONLY)).toBeFalsy();
    });

    it("should return false if it isn't in the list", () => {
      expect(
        requiredRoles(
          [MemberRole.OWNER, MemberRole.ADMIN],
          MemberRole.READ_ONLY,
        ),
      ).toBeFalsy();
    });

    it('should return true when the user match the required role', () => {
      expect(
        requiredRoles([MemberRole.OWNER, MemberRole.ADMIN], MemberRole.ADMIN),
      ).toBeTruthy();
    });
  });

  describe('findTeamInd function', () => {
    it('should return 0 by default when the list is undefined', () => {
      const ind = findTeamInd(undefined, 'RANDOM_ID');

      expect(ind).toEqual(0);
    });

    it('should return -1 when the list is emptied', () => {
      const ind = findTeamInd([], 'RANDOM_ID');

      expect(ind).toEqual(-1);
    });

    it("should return -1 when the team ID isn't found", () => {
      const ind = findTeamInd(
        [
          {
            id: 'id_1',
            displayName: 'display_name_1',
          },
          {
            id: 'id_2',
            displayName: 'display_name_2',
          },
          {
            id: 'id_3',
            displayName: 'display_name_3',
          },
        ],
        'RANDOM_ID',
      );

      expect(ind).toEqual(-1);
    });

    it('should return the correct index giving the team ID', () => {
      const ind = findTeamInd(
        [
          {
            id: 'id_1',
            displayName: 'display_name_1',
          },
          {
            id: 'id_2',
            displayName: 'display_name_2',
          },
          {
            id: 'id_3',
            displayName: 'display_name_3',
          },
        ],
        'id_2',
      );

      expect(ind).toEqual(1);
    });
  });
});
