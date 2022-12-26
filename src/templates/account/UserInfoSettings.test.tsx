import '__mocks__/intersectionObserverMock';

import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';

import { authProviderRender } from '@/utils/TestUtils.test';

import { UserInfoSettings } from './UserInfoSettings';

describe('UserInfoSettings', () => {
  describe('Render method', () => {
    it('should open the dialog to change the email address and close it', async () => {
      authProviderRender(<UserInfoSettings />);

      const settingLine = screen.getAllByTestId('setting-line');
      const changeEmailAddress = settingLine.find((elt) =>
        within(elt).queryByText('Email address')
      );
      assert(
        changeEmailAddress !== undefined,
        'Change email address settings not found'
      );

      // Should open the change email dialog
      const changeButton = within(changeEmailAddress).getByRole('button', {
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
      const changePassword = settingLine.find((elt) =>
        within(elt).queryByText('Password')
      );
      assert(
        changePassword !== undefined,
        'Change password settings not found'
      );

      // Should open the change password dialog
      const changeButton = within(changePassword).getByRole('button', {
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
