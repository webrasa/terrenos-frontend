import '__mocks__/intersectionObserverMock';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authProviderRender } from '@/utils/TestUtils';

import { TeamSettings } from './TeamSettings';

describe('TeamSettings', () => {
  describe('Render method', () => {
    it('should render the team settings page where the user can change the team display name or delete the team', () => {
      authProviderRender(
        <TeamSettings
          settings={{
            planId: 'RANDOM_PLAN_ID',
            planName: 'RANDOM_PLAN_NAME',
            hasStripeCustomerId: false,
          }}
        />
      );

      const changeDisplayNameButton = screen.getByRole('button', {
        name: 'Change',
      });
      expect(changeDisplayNameButton).toBeInTheDocument();

      const deleteButton = screen.queryByRole('button', { name: 'Delete' });
      expect(deleteButton).toBeInTheDocument();
    });

    it('should open the team display name dialog and close it', async () => {
      authProviderRender(
        <TeamSettings
          settings={{
            planId: 'RANDOM_PLAN_ID',
            planName: 'RANDOM_PLAN_NAME',
            hasStripeCustomerId: false,
          }}
        />
      );

      const changeDisplayNameButton = screen.getByRole('button', {
        name: 'Change',
      });
      await userEvent.click(changeDisplayNameButton);

      const dialogTitle = screen.getByRole('dialog', {
        name: 'Change display name',
      });
      expect(dialogTitle).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      expect(cancelButton).not.toBeInTheDocument();
    });

    it('should open the delete team dialog and close it', async () => {
      authProviderRender(
        <TeamSettings
          settings={{
            planId: 'RANDOM_PLAN_ID',
            planName: 'RANDOM_PLAN_NAME',
            hasStripeCustomerId: false,
          }}
        />
      );

      const deleteButton = screen.getByRole('button', { name: 'Delete' });
      await userEvent.click(deleteButton);

      const dialogTitle = screen.getByRole('dialog', { name: 'Delete team' });
      expect(dialogTitle).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      expect(cancelButton).not.toBeInTheDocument();
    });
  });
});
