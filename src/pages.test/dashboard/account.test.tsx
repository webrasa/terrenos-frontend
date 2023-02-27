import '__mocks__/intersectionObserverMock';

import { mockUseRouterPush } from '__mocks__/next/router';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';

import Account from '@/pages/dashboard/account';
import { authProviderRender } from '@/utils/TestUtils.test';

describe('Account page', () => {
  describe('Render method', () => {
    it('should render the account setting page for user signed in with email', async () => {
      authProviderRender(<Account />);

      expect(mockUseRouterPush).not.toHaveBeenCalled();

      const firstButton = screen.getAllByRole('button')[0];
      assert(firstButton !== undefined, 'The first button not found');
      await userEvent.click(firstButton);
    });

    it('should deny the access to user who signed in with third party auth (OAuth) and redirect to dashboard index page', () => {
      authProviderRender(<Account />, { identities: 'RANDOM_IDENTITIES' });

      expect(mockUseRouterPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
