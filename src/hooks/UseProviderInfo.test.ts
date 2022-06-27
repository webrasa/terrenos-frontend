import { mockCurrentUserInfo } from '__mocks__/aws-amplify';
import { renderHook, waitFor } from '@testing-library/react';
import assert from 'assert';

import { AuthState, useProviderInfo } from './UseProviderInfo';

describe('UseProviderInfo', () => {
  describe('Render hook', () => {
    it('should start with `authenticating` state in user info', async () => {
      const { result } = renderHook(() => useProviderInfo());

      await waitFor(() => {
        expect(result.current.userInfo).toEqual(AuthState.AUTHENTICATING);
      });
    });

    it("should return `unauthenticated` state when the user isn't logged in", async () => {
      const { result } = renderHook(() => useProviderInfo());

      await waitFor(() => {
        expect(result.current.userInfo).toEqual(AuthState.UNAUTHENTICATED);
      });
    });

    it('should bypass authentication for local environment', async () => {
      // Save the original process.env
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        NEXT_PUBLIC_COGNITO_USER_ID_LOCAL: 'RANDOM_COGNITO_USER_ID_LOCAL',
        NEXT_PUBLIC_COGNITO_USER_EMAIL_LOCAL: 'RANDOM_COGNITO_USER_EMAIL_LOCAL',
      };

      const { result } = renderHook(() => useProviderInfo());
      const { userInfo } = result.current;

      assert(
        userInfo !== AuthState.AUTHENTICATING &&
          userInfo !== AuthState.UNAUTHENTICATED,
        'user should be authenticated in local environment when process.env are set up correctly'
      );
      expect(userInfo.id).toEqual('RANDOM_COGNITO_USER_ID_LOCAL');
      expect(userInfo.email).toEqual('RANDOM_COGNITO_USER_EMAIL_LOCAL');

      // Restore the original process.env
      process.env = originalEnv;
    });

    it('should return user information when the user is signed in', async () => {
      mockCurrentUserInfo.mockReturnValueOnce({
        attributes: {
          sub: 'RANDOM_USER_ATTRIBUTES_SUB',
          email: 'RANDOM_USER_ATTRIBUTES_EMAIL',
          identities: 'RANDOM_USER_ATTRIBUTES_IDENTITIES',
        },
      });
      const { result } = renderHook(() => useProviderInfo());

      await waitFor(() => {
        expect(result.current.userInfo).toEqual(
          expect.objectContaining({
            id: 'RANDOM_USER_ATTRIBUTES_SUB',
            email: 'RANDOM_USER_ATTRIBUTES_EMAIL',
            identities: 'RANDOM_USER_ATTRIBUTES_IDENTITIES',
          })
        );
      });
    });
  });
});
