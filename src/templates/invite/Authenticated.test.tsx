import { mockIsReady, mockQuery } from '__mocks__/next/router';
import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import {
  authProviderRender,
  swrConfigWithAuthRender,
} from '@/utils/TestUtils.test';

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

    it('should render the error page when the user is signed in and when the verification code is incorrect', async () => {
      mockQuery.mockReturnValue({
        teamId: 'RANDOM_TEAM_ID',
        verificationCode: 'RANDOM_VERIFICATION_CODE',
      });
      mockIsReady.mockReturnValue(true);
      server.use(
        http.get('/team/RANDOM_TEAM_ID/join/RANDOM_VERIFICATION_CODE', () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      swrConfigWithAuthRender(<Authenticated />);

      await waitFor(() => {
        const goDashboardLink = screen.queryByRole('link', {
          name: 'Go to dashboard',
        });
        expect(goDashboardLink).toBeInTheDocument();
      });
    });

    it('should render the accept invitation button when the user is signed in and when the verification code is correct', async () => {
      mockQuery.mockReturnValue({
        teamId: 'RANDOM_TEAM_ID',
        verificationCode: 'RANDOM_VERIFICATION_CODE',
      });
      mockIsReady.mockReturnValue(true);
      server.use(
        http.get('/team/RANDOM_TEAM_ID/join/RANDOM_VERIFICATION_CODE', () => {
          return HttpResponse.json({
            displayName: 'RANDOM_TEAM_DISPLAY_NAME',
          });
        }),
      );

      swrConfigWithAuthRender(<Authenticated />);

      await waitFor(() => {
        const acceptButton = screen.queryByText('Accept invite');
        expect(acceptButton).toBeInTheDocument();
      });
    });
  });
});
