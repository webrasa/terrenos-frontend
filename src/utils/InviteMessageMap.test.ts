import { mapInviteMessage } from './InviteMessageMap';

describe('InviteMessageMap', () => {
  describe('mapInviteMessage function', () => {
    it("should throw the input as an exception when the errors doesn't follow the expected schema", () => {
      expect(() => mapInviteMessage('random parameter')).toThrow(
        'random parameter',
      );
    });

    it("should return a generic error message when the error isn't expected/supported", () => {
      const message = mapInviteMessage({
        response: {
          data: {
            errors: 'random error',
          },
        },
      });
      expect(message).toEqual('Impossible to accept invite');
    });

    it('should map error code from the server to a more user-friendly message', () => {
      // Test only for one mapping, doesn't make sense to test all the different combination.
      const message = mapInviteMessage({
        response: {
          data: {
            errors: 'already_member',
          },
        },
      });
      expect(message).toEqual("You're already a member of the team");
    });
  });
});
