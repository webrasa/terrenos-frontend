import { mockCurrentUserInfo } from '__mocks__/aws-amplify';
import { mockUseRouterPush } from '__mocks__/next/router';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import type { SetupServerApi } from 'msw/node';
import { setupServer } from 'msw/node';
import { act } from 'react-dom/test-utils';
import { SWRConfig } from 'swr';

import { fetcher, swrConfigRender } from '@/utils/TestUtils';

import type { IAuthProviderProps } from './UseAuth';
import { AuthProvider, useAuth } from './UseAuth';

const authProviderWrapper = ({ children }: IAuthProviderProps) => (
  <SWRConfig
    value={{
      provider: () => new Map(),
      fetcher,
      dedupingInterval: 0,
    }}
  >
    <AuthProvider>{children}</AuthProvider>
  </SWRConfig>
);

const setMockUserInfo = () => {
  mockCurrentUserInfo.mockReturnValue({
    attributes: {
      sub: 'RANDOM_USER_ATTRIBUTES_SUB',
      email: 'RANDOM_USER_ATTRIBUTES_EMAIL',
      identities: 'RANDOM_USER_ATTRIBUTES_IDENTITIES',
    },
  });
};

const setUserProfileServer = (server: SetupServerApi) => {
  server.use(
    rest.get('/user/profile', (_req, res, ctx) => {
      return res(
        ctx.json({
          teamList: [
            {
              id: 'RANDOM_TEAM_ID',
              displayName: 'Team Name 1',
            },
            {
              id: 'RANDOM_TEAM_ID2',
              displayName: 'Team Name 2',
            },
            {
              id: 'RANDOM_TEAM_ID3',
              displayName: 'Team Name 3',
            },
          ],
        })
      );
    })
  );
};

describe('UseAuth', () => {
  const server = setupServer();

  beforeAll(() => server.listen());

  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
  });

  describe('AuthProvider without endpoint', () => {
    it('should start by returning null and wait asynchronously for user info', async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      // Technically we don't need to waitFor for updated status.
      // But the render call setState and this is the reason we need `waitFor`
      await waitFor(() => {
        expect(mockUseRouterPush).not.toHaveBeenCalled();
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });

    it("should return null and redirect to login page when the user isn't signed in", async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      // Technically we don't need to waitFor for updated status.
      // But the render call setState and this is the reason we need `waitFor`
      await waitFor(() => {
        expect(mockUseRouterPush).toHaveBeenCalledWith('/login');
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });
  });

  describe('AuthProvider with mocked endpoint', () => {
    beforeEach(() => {
      setMockUserInfo();
    });

    it('should return null when the backend only returns an empty object', async () => {
      swrConfigRender(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        const content = screen.queryByText('Protected');
        expect(content).not.toBeInTheDocument();
      });
    });

    it('should return the protected content when the user is signed in', async () => {
      setUserProfileServer(server);

      swrConfigRender(<AuthProvider>Protected</AuthProvider>);

      expect(await screen.findByText('Protected')).toBeInTheDocument();
    });
  });

  describe('useAuth hook', () => {
    it("should expect to wrapped around AuthProvider component and raise an exception when it isn't", () => {
      // Save original console.error
      /* eslint-disable no-console */
      const originalError = console.error;
      console.error = (...args) => {
        // Filtering console.error message. This is done automatically in React Hook Testing library: https://github.com/testing-library/react-hooks-testing-library/blob/main/src/core/console.ts#L2
        // But not in React Testing with renderHook.
        if (
          /Error: Uncaught/.test(args[0]) ||
          /The above error occurred in the/.test(args[0])
        ) {
          return;
        }

        originalError.call(console, ...args);
      };

      expect(() => renderHook(() => useAuth())).toThrow(
        'hook must be wrapped within'
      );

      // Restore the original console.error
      console.error = originalError;
      /* eslint-enable no-console */
    });

    it('should be wrapped around AuthProvider component and team index should remain at 0 when there is an out of bound selection', async () => {
      setMockUserInfo();
      setUserProfileServer(server);

      const { result } = renderHook(() => useAuth(), {
        wrapper: authProviderWrapper,
      });

      await waitFor(() => {
        expect(result.current.currentTeamInd).toEqual(0);
      });

      act(() => {
        result.current.setCurrentTeamInd(8);
      });

      await waitFor(() => {
        expect(result.current.currentTeamInd).toEqual(0);
      });
    });

    it('should be wrapped around AuthProvider component and the user can select a new team', async () => {
      setMockUserInfo();
      setUserProfileServer(server);

      const { result } = renderHook(() => useAuth(), {
        wrapper: authProviderWrapper,
      });

      await waitFor(() => {
        expect(result.current.currentTeamInd).toEqual(0);
      });

      act(() => {
        result.current.setCurrentTeamInd(2);
      });

      await waitFor(() => {
        expect(result.current.currentTeamInd).toEqual(2);
      });

      expect(result.current.currentTeam.id).toEqual('RANDOM_TEAM_ID3');
    });
  });
});
