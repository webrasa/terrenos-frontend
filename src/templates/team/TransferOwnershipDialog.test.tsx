import '__mocks__/intersectionObserverMock';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemberRole } from '@/types/IMember';
import { authProviderRender } from '@/utils/TestUtils.test';

import { TransferOwnershipDialog } from './TransferOwnershipDialog';

describe('TransferOwnershipDialog', () => {
  describe('Render method', () => {
    it('should not render the dialog', () => {
      authProviderRender(
        <TransferOwnershipDialog
          show={false}
          list={[]}
          handleCloseDialog={() => {}}
        />,
      );

      const title = screen.queryByText('Transfer team ownership');
      expect(title).not.toBeInTheDocument();
    });

    it('should render the dialog containing all team members without the owner', async () => {
      authProviderRender(
        <TransferOwnershipDialog
          show={true}
          list={[
            {
              email: 'user@example.com',
              memberId: 'userid1',
              role: MemberRole.ADMIN,
            },
            {
              email: 'user2@example.com',
              memberId: 'userid2',
              role: MemberRole.OWNER,
            },
            {
              email: 'user3@example.com',
              memberId: 'userid3',
              role: MemberRole.READ_ONLY,
            },
          ]}
          handleCloseDialog={() => {}}
        />,
      );

      const selectButton = screen.getByRole('button', {
        name: 'user@example.com',
      });
      await userEvent.click(selectButton);

      const owner = screen.queryByText('user2@example.com');
      expect(owner).not.toBeInTheDocument();

      const lastUser = screen.queryByText('user3@example.com');
      expect(lastUser).toBeInTheDocument();
    });
  });
});
