import '__mocks__/intersectionObserverMock';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditableUserList } from './EditableUserList';

describe('EditableUserList', () => {
  describe('Render method', () => {
    it('should able to paginate to the next page', async () => {
      const handleNextPage = jest.fn();

      render(
        <EditableUserList
          data={{
            userList: [
              {
                createDate: '2021-01-01',
                email: 'random@example.com',
                enabled: true,
                username: 'RANDOM_USERNAME',
              },
            ],
            paginationToken: 'token',
          }}
          prevTokenList={[]}
          currentUrl="RANDOM_URL"
          handleNextPage={handleNextPage}
          handlePreviousPage={() => {}}
        />,
      );

      const nextButton = await screen.findByRole('button', { name: 'Next' });
      await userEvent.click(nextButton);

      expect(handleNextPage).toHaveBeenCalled();
    });

    it('should able to paginate to the previous page', async () => {
      const handlePreviousPage = jest.fn();

      render(
        <EditableUserList
          data={{
            userList: [
              {
                createDate: '2021-01-01',
                email: 'random@example.com',
                enabled: true,
                username: 'RANDOM_USERNAME',
              },
            ],
          }}
          prevTokenList={['previousToken']}
          currentUrl="RANDOM_URL"
          handleNextPage={() => {}}
          handlePreviousPage={handlePreviousPage}
        />,
      );

      const previousButton = await screen.findByRole('button', {
        name: 'Previous',
      });
      await userEvent.click(previousButton);

      expect(handlePreviousPage).toHaveBeenCalled();
    });

    it('should open the disable user dialog when the user is enabled', async () => {
      render(
        <EditableUserList
          data={{
            userList: [
              {
                createDate: '2021-01-01',
                email: 'random@example.com',
                enabled: true,
                username: 'RANDOM_USERNAME',
              },
            ],
            paginationToken: 'token',
          }}
          prevTokenList={[]}
          currentUrl="RANDOM_URL"
          handleNextPage={() => {}}
          handlePreviousPage={() => {}}
        />,
      );

      const disableButton = await screen.findByRole('button', {
        name: 'Disable',
      });
      await userEvent.click(disableButton);

      const disableUserDialog = screen.getByRole('dialog', {
        name: 'Disable User',
      });
      expect(disableUserDialog).toBeInTheDocument();

      const disableUserButton = within(disableUserDialog).queryByRole(
        'button',
        {
          name: 'Disable',
        },
      );
      expect(disableUserButton).toBeInTheDocument();
    });

    it('should open the enable user dialog when the user is disabled', async () => {
      render(
        <EditableUserList
          data={{
            userList: [
              {
                createDate: '2021-01-01',
                email: 'random@example.com',
                enabled: false,
                username: 'RANDOM_USERNAME',
              },
            ],
            paginationToken: 'token',
          }}
          prevTokenList={[]}
          currentUrl="RANDOM_URL"
          handleNextPage={() => {}}
          handlePreviousPage={() => {}}
        />,
      );

      const enableButton = await screen.findByRole('button', {
        name: 'Enable',
      });
      await userEvent.click(enableButton);

      const enableUserDialog = screen.getByRole('dialog', {
        name: 'Enable User',
      });
      expect(enableUserDialog).toBeInTheDocument();

      const enableUserButton = within(enableUserDialog).queryByRole('button', {
        name: 'Enable',
      });
      expect(enableUserButton).toBeInTheDocument();
    });
  });
});
