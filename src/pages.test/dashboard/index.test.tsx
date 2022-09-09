import { mockUseRouterPush } from '__mocks__/next/router';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Index from '@/pages/dashboard';
import { authProviderRender, swrConfigWithAuthRender } from '@/utils/TestUtils';

describe('Dashboard Index page', () => {
  describe('Render method with endpoint', () => {
    const server = setupServer();

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    afterEach(() => {
      server.resetHandlers();
    });

    it('should render the add button when the todo list is empty', async () => {
      server.use(
        rest.get('/RANDOM_TEAM_ID/todo/list', (_req, res, ctx) => {
          return res(
            ctx.json({
              list: [],
            })
          );
        })
      );
      swrConfigWithAuthRender(<Index />);

      await waitFor(() => {
        const addButton = screen.queryByText('Add Todo');
        expect(addButton).toBeInTheDocument();
      });
    });
  });

  describe('Session storage for invite process', () => {
    it("shouldn't redirect to invitation page when the join-team-path session storage is empty", () => {
      authProviderRender(<Index />);

      expect(mockUseRouterPush).not.toHaveBeenCalled();
    });

    it('should redirect to the invitation page using join-team-path data from session storage', () => {
      const mockGetItem = jest.fn().mockReturnValue('RANDOM_JOIN_TEAM_PATH');

      // Object.getPrototypeOf is the modern way of __proto__
      Object.getPrototypeOf(window.sessionStorage).getItem = mockGetItem;

      const { container } = authProviderRender(<Index />);

      expect(container).toBeEmptyDOMElement();
      expect(mockUseRouterPush.mock.calls[0][0]).toContain(
        'RANDOM_JOIN_TEAM_PATH'
      );
    });
  });
});
