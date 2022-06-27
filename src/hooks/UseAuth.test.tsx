import { mockCurrentUserInfo } from '__mocks__/aws-amplify';
import { mockUseRouterPush } from '__mocks__/next/router';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';

import { AuthProvider } from './UseAuth';

const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

describe('UseAuth', () => {
  describe('AuthProvider without endpoint', () => {
    it('should start by returning `null` and wait asynchronously for user info', async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        expect(mockUseRouterPush).not.toBeCalled();
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });

    it("should return `null` and redirect to login page when the user isn't signed in", async () => {
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
    const server = setupServer(
      rest.get('/user/profile', (_req, res, ctx) => {
        return res(ctx.json({}));
      })
    );

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    afterEach(() => {
      server.resetHandlers();
    });

    it('should return `null` when the backend only return an empty object', async () => {
      mockCurrentUserInfo.mockReturnValueOnce({
        attributes: {
          sub: 'RANDOM_USER_ATTRIBUTES_SUB',
          email: 'RANDOM_USER_ATTRIBUTES_EMAIL',
          identities: 'RANDOM_USER_ATTRIBUTES_IDENTITIES',
        },
      });

      render(
        <SWRConfig
          value={{
            provider: () => new Map(),
            fetcher,
            dedupingInterval: 0,
          }}
        >
          <AuthProvider>Protected</AuthProvider>
        </SWRConfig>
      );

      await waitFor(() => {
        const content = screen.queryByText('Protected');
        expect(content).not.toBeInTheDocument();
      });
    });
  });
});
