import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from './Select';

describe('Select', () => {
  describe('Render method', () => {
    it('should render without error when the option list is empty', async () => {
      const handleChange = jest.fn();

      render(
        <Select
          value={0}
          currentLabel="RANDOM_TEAM_LABEL"
          handleChange={handleChange}
          optionList={[]}
        />
      );

      const selectButton = screen.queryByRole('button', {
        name: 'RANDOM_TEAM_LABEL',
      });
      expect(selectButton).toBeInTheDocument();
    });

    it('should render the select and select one option', async () => {
      const handleChange = jest.fn();

      render(
        <Select
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
