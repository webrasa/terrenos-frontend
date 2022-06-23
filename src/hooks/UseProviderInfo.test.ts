import { renderHook, waitFor } from '@testing-library/react';

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
  });
});
