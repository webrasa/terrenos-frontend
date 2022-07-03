import { mockUseRouterPush } from '__mocks__/next/router';
import { mockSetCurrentTeamInd } from '__mocks__/UseAuth';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { authProviderRender } from '@/utils/TestUtils';

import { SidebarTeamSelection } from './SidebarTeamSelection';

describe('SidebarTeamSelection', () => {
  describe('Render method', () => {
    it('should render the team list correctly', async () => {
      authProviderRender(<SidebarTeamSelection />);

      // Click on the select button and show the option list
      const selectButton = screen.getByRole('button', {
        name: 'RANDOM_DISPLAY_NAME',
      });
      await userEvent.click(selectButton);

      // On the mocked data there are 3 teams in the list
      const firstTeamOption = screen.queryByText('RANDOM_TEAM_DISPLAY_NAME');
      expect(firstTeamOption).toBeInTheDocument();
      screen.getByText('RANDOM_TEAM_DISPLAY_NAME2');
      screen.getByText('RANDOM_TEAM_DISPLAY_NAME3');
    });

    it('should be able to switch to another team', async () => {
      authProviderRender(<SidebarTeamSelection />);

      // Click on the select button and show the option list
      const selectButton = screen.getByRole('button', {
        name: 'RANDOM_DISPLAY_NAME',
      });
      await userEvent.click(selectButton);

      // Click on the create new team option
      const anotherTeamOption = screen.getByText('RANDOM_TEAM_DISPLAY_NAME2');
      await userEvent.click(anotherTeamOption);

      // When the user selects one team in the list, he'll switch to another team.
      // All information displayed on the dashboard are coming from this second team.
      // The setCurrentTeam handler will be called with the second team index.
      // In testing, the list is mocked and `RANDOM_TEAM_DISPLAY_NAME2` is the second in the list (`1` in code).
      expect(mockSetCurrentTeamInd).toBeCalledWith(1);
    });

    it('should have the last option for creating a new team', async () => {
      authProviderRender(<SidebarTeamSelection />);

      // Click on the select button and show the option list
      const selectButton = screen.getByRole('button', {
        name: 'RANDOM_DISPLAY_NAME',
      });
      await userEvent.click(selectButton);

      // Click on the create new team option
      const createButton = screen.getByText('Create new team');
      await userEvent.click(createButton);

      // It should redirect the user to `/dashboard/create-team`
      expect(mockUseRouterPush).toBeCalledWith('/dashboard/create-team');
    });
  });
});
