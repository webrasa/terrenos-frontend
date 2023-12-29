import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserListTable } from './UserListTable';

describe('UserListTable', () => {
  describe('Render method', () => {
    it('should render the user with enable status', async () => {
      const handleChange = jest.fn();

      render(
        <UserListTable
          userList={[
            {
              createDate: '2021-01-01',
              email: 'random@example.com',
              enabled: true,
              username: 'RANDOM_USERNAME',
            },
          ]}
          handleOpenDialog={handleChange}
        />,
      );

      const enabledStatus = screen.queryByText('Enabled');
      expect(enabledStatus).toBeInTheDocument();

      const disableButton = screen.getByRole('button', { name: 'Disable' });
      await userEvent.click(disableButton);

      expect(handleChange).toHaveBeenCalled();
    });

    it('should render the user with disable status', async () => {
      const handleChange = jest.fn();

      render(
        <UserListTable
          userList={[
            {
              createDate: '2021-01-01',
              email: 'random@example.com',
              enabled: false,
              username: 'RANDOM_USERNAME',
            },
          ]}
          handleOpenDialog={handleChange}
        />,
      );

      const enabledStatus = screen.queryByText('Disabled');
      expect(enabledStatus).toBeInTheDocument();

      const disableButton = screen.getByRole('button', { name: 'Enable' });
      await userEvent.click(disableButton);

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
