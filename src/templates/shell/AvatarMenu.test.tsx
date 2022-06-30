import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authProviderRender } from '@/utils/TestUtils';

import { AvatarMenu } from './AvatarMenu';

describe('AvatarMenu', () => {
  describe('Render method', () => {
    it('should have a sign out button', async () => {
      authProviderRender(<AvatarMenu />);

      const avatarButton = screen.getByText('RA');
      await userEvent.click(avatarButton);

      const signOutButton = screen.queryByText('Sign Out');
      expect(signOutButton).toBeInTheDocument();
    });

    it('should render a link to update the account when the user is signed in with email', async () => {
      authProviderRender(<AvatarMenu />);

      const avatarButton = screen.getByText('RA');
      await userEvent.click(avatarButton);

      const accountButton = screen.queryByText('Account');
      expect(accountButton).toBeInTheDocument();
    });

    it("shouldn't render a link to update the account when the user is signed with OAuth (external provider)", async () => {
      authProviderRender(<AvatarMenu />, { identities: 'RANDOM_IDENTITIES' });

      const avatarButton = screen.getByText('RA');
      await userEvent.click(avatarButton);

      const accountButton = screen.queryByText('Account');
      expect(accountButton).not.toBeInTheDocument();
    });
  });
});
