import { mockUseRouterPush } from '__mocks__/next/router';

import Account from '@/pages/dashboard/account';
import { authProviderRender } from '@/utils/TestUtils';

describe('Account page', () => {
  describe('Render method', () => {
    it('should render the account setting page for user signed in with email', () => {
      authProviderRender(<Account />);

      expect(mockUseRouterPush).not.toBeCalled();
    });

    it('should deny the access to user who signed in with third party auth (OAuth) and redirect to dashboard index page', () => {
      authProviderRender(<Account />, { identities: 'RANDOM_IDENTITIES' });

      expect(mockUseRouterPush).toBeCalledWith('/dashboard');
    });
  });
});
