import '__mocks__/intersectionObserverMock';

import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';

import { authProviderRender } from '@/utils/TestUtils';

import { UserInfoSettings } from './UserInfoSettings';

describe('UserInfoSettings', () => {
  describe('Render method', () => {
    it('should open the dialog to change the email address and close it', async () => {
      authProviderRender(<UserInfoSettings />);

      const settingLine = screen.getAllByTestId('setting-line');
      assert(
        settingLine[0] !== undefined,
        'Changing email address should be available'
      );

      // Changing the email address is the first setting.
      const changeEmailAddress = within(settingLine[0]).queryByText(
        'Email address'
      );
      expect(changeEmailAddress).toBeInTheDocument();

      // Should open the change email dialog
      const changeButton = within(settingLine[0]).getByRole('button', {
        name: 'Change',
      });
      await userEvent.click(changeButton);

      // Check if the dialog is opened
      const dialogTitle = screen.getByRole('dialog', {
        name: 'Change email',
      });
      expect(dialogTitle).toBeInTheDocument();

      // Close the dialog
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      // Check the dialog is correctly closed
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('should open the dialog to change the password and close it', async () => {
      authProviderRender(<UserInfoSettings />);

      const settingLine = screen.getAllByTestId('setting-line');
      assert(
        settingLine[1] !== undefined,
        'Changing password should be available'
      );

      // Changing the password is the second setting.
      const changePassword = within(settingLine[1]).queryByText('Password');
      expect(changePassword).toBeInTheDocument();

      // Should open the change password dialog
      const changeButton = within(settingLine[1]).getByRole('button', {
        name: 'Change',
      });
      await userEvent.click(changeButton);

      // Check if the dialog is opened
      const dialogTitle = screen.getByRole('dialog', {
        name: 'Change password',
      });
      expect(dialogTitle).toBeInTheDocument();

      // Close the dialog
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      // Check the dialog is correctly closed
      expect(cancelButton).not.toBeInTheDocument();
    });
  });
});
