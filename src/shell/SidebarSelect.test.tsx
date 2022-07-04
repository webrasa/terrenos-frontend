import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SidebarSelect } from './SidebarSelect';

describe('SidebarSelect', () => {
  describe('Render method', () => {
    it('should', async () => {
      const handleChange = jest.fn();

      render(
        <SidebarSelect
          value={0}
          currentLabel="RANDOM_TEAM_LABEL"
          handleChange={handleChange}
          optionList={[
            {
              id: 'RANDOM_TEAM_ID',
              label: 'RANDOM_TEAM_LABEL',
            },
            {
              id: 'RANDOM_TEAM_ID2',
              label: 'RANDOM_TEAM_LABEL2',
            },
          ]}
        />
      );

      // Click on the select button and show the option list
      const selectButton = screen.getByRole('button', {
        name: 'RANDOM_TEAM_LABEL',
      });
      await userEvent.click(selectButton);

      // Select one option from the list
      const selectOption = screen.getByText('RANDOM_TEAM_LABEL2');
      await userEvent.click(selectOption);

      expect(handleChange).toBeCalled();
    });
  });
});
