import { mockIsReady, mockQuery } from '__mocks__/next/router';
import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';

import { authProviderRender, swrConfigWithAuthRender } from '@/utils/TestUtils';

import { Authenticated } from './Authenticated';

describe('Authenticated', () => {
  describe('Render method without endpoint', () => {
    it('should start by returning null before reaching the endpoint', async () => {
      const { container } = authProviderRender(<Authenticated />);

      await waitFor(() => {
        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  describe('Render method with endpoint', () => {
    const server = setupServer();

    beforeAll(() => server.listen());

    afterAll(() => server.close());

    afterEach(() => {
      server.resetHandlers();
    });

    it('should render the accept invitation button when the user is signed in and when the verification code is correct', async () => {
      mockQuery.mockReturnValue({
        teamId: 'RANDOM_TEAM_ID',
        verificationCode: 'RANDOM_VERIFICATION_CODE',
      });
      mockIsReady.mockReturnValue(true);
      server.use(
        rest.get(
          '/team/RANDOM_TEAM_ID/join/RANDOM_VERIFICATION_CODE',
          (_req, res, ctx) => {
            return res(
              ctx.json({
                displayName: 'RANDOM_TEAM_DISPLAY_NAME',
              })
            );
          }
        )
      );

      swrConfigWithAuthRender(<Authenticated />);

      await waitFor(() => {
        const acceptButton = screen.queryByText('Accept invite');
        expect(acceptButton).toBeInTheDocument();
      });
    });
  });
});
