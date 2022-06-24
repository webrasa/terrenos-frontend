import { renderHook, waitFor } from '@testing-library/react';
import assert from 'assert';

import { AuthState, useProviderInfo } from './UseProviderInfo';

describe('useProviderInfo', () => {
  describe('Render hook', () => {
    it('should start with `authenticating` state in user info', async () => {
      const { result } = renderHook(() => useProviderInfo());

      expect(result.current.userInfo).toEqual(AuthState.AUTHENTICATING);
    });

    it("should return `unauthenticated` state when the user isn't logged in", async () => {
      const { result } = renderHook(() => useProviderInfo());

      await waitFor(() => {
        expect(result.current.userInfo).toEqual(AuthState.UNAUTHENTICATED);
      });
    });

    it('should bypass authentication for local testing', async () => {
      // Save the original process.env
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        NEXT_PUBLIC_COGNITO_USER_ID_LOCAL: 'COGNITO_USER_ID_LOCAL',
        NEXT_PUBLIC_COGNITO_USER_EMAIL_LOCAL: 'COGNITO_USER_EMAIL_LOCAL',
      };

      const { result } = renderHook(() => useProviderInfo());
      const { userInfo } = result.current;

      assert(
        userInfo !== AuthState.AUTHENTICATING &&
          userInfo !== AuthState.UNAUTHENTICATED,
        'user should be authenticated in local environment when process.env are set up correctly'
      );
      expect(userInfo.id).toEqual('COGNITO_USER_ID_LOCAL');
      expect(userInfo.email).toEqual('COGNITO_USER_EMAIL_LOCAL');

      // Restore the original process.env
      process.env = originalEnv;
    });
  });
});
