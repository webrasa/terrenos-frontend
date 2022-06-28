import { mockCurrentUserInfo } from '__mocks__/aws-amplify';
import { mockUseRouterPush } from '__mocks__/next/router';
import type { RenderOptions } from '@testing-library/react';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import type { ReactElement } from 'react';
import { SWRConfig } from 'swr';

import { AuthProvider, useAuth } from './UseAuth';

const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const swrConfigRender = (ui: ReactElement, renderOptions?: RenderOptions) =>
  render(
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher,
        dedupingInterval: 0,
      }}
    >
      {ui}
    </SWRConfig>,
    renderOptions
  );

describe('UseAuth', () => {
  describe('AuthProvider without endpoint', () => {
    it('should start by returning null and wait asynchronously for user info', async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        expect(mockUseRouterPush).not.toBeCalled();
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });

    it("should return null and redirect to login page when the user isn't signed in", async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        expect(mockUseRouterPush).toBeCalledWith('/login');
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });
  });

  describe('AuthProvider with mocked endpoint', () => {
    const server = setupServer();

    beforeAll(() => server.listen());

    beforeEach(() => {
      mockCurrentUserInfo.mockReturnValueOnce({
        attributes: {
          sub: 'RANDOM_USER_ATTRIBUTES_SUB',
          email: 'RANDOM_USER_ATTRIBUTES_EMAIL',
          identities: 'RANDOM_USER_ATTRIBUTES_IDENTITIES',
        },
      });
    });

    afterAll(() => server.close());

    afterEach(() => {
      server.resetHandlers();
    });

    it('should return null when the backend only returns an empty object', async () => {
      swrConfigRender(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        const content = screen.queryByText('Protected');
        expect(content).not.toBeInTheDocument();
      });
    });

    it('should return the protected content when the user is signed in', async () => {
      server.use(
        rest.get('/user/profile', (_req, res, ctx) => {
          return res(
            ctx.json({
              teamList: [
                {
                  id: 'RANDOM_TEAM_ID',
                  displayName: 'Team Name 1',
                },
              ],
            })
          );
        })
      );

      swrConfigRender(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        const content = screen.queryByText('Protected');
        expect(content).toBeInTheDocument();
      });
    });
  });

  describe('useAuth hook', () => {
    it('should expect to wrapped around AuthProvider component', () => {
      expect(() => renderHook(() => useAuth())).toThrow(
        'hook must be wrapped within'
      );
    });
  });
});
