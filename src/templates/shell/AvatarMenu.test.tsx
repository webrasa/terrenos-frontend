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

      const signOutButton = screen.getByText('Sign Out');
      expect(signOutButton).toBeInTheDocument();
    });
  });
});
