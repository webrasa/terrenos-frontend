import '__mocks__/intersectionObserverMock';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { IMember } from '@/types/IMember';
import { MemberRole } from '@/types/IMember';
import { authProviderRender } from '@/utils/TestUtils.test';

import { TeamTable } from './TeamTable';

describe('TeamTable', () => {
  describe('Render method', () => {
    it("shouldn't show any action buttons when the list is empty", () => {
      authProviderRender(
        <TeamTable list={[]} inviteList={[]} role={MemberRole.ADMIN} />,
      );

      const editButton = screen.queryByText('Edit');
      expect(editButton).not.toBeInTheDocument();

      const deleteButton = screen.queryByText('Delete');
      expect(deleteButton).not.toBeInTheDocument();
    });

    it('should show action buttons when the list contains data', () => {
      const list: IMember[] = [
        {
          memberId: 'member-1',
          email: 'random@example.com',
          role: MemberRole.ADMIN,
        },
        {
          memberId: 'member-2',
          email: 'random2@example.com',
          role: MemberRole.READ_ONLY,
        },
        {
          memberId: 'member-3',
          email: 'random3@example.com',
          role: MemberRole.ADMIN,
        },
      ];

      authProviderRender(
        <TeamTable list={list} inviteList={[]} role={MemberRole.ADMIN} />,
      );

      const editButtons = screen.queryAllByText('Edit');
      expect(editButtons).toHaveLength(3);

      const deleteButtons = screen.queryAllByText('Remove');
      expect(deleteButtons).toHaveLength(3);
    });

    it('should show action buttons when the invite list contains data', () => {
      const inviteList: IMember[] = [
        {
          memberId: 'member-1',
          email: 'random@example.com',
          role: MemberRole.ADMIN,
        },
        {
          memberId: 'member-2',
          email: 'random2@example.com',
          role: MemberRole.READ_ONLY,
        },
        {
          memberId: 'member-3',
          email: 'random3@example.com',
          role: MemberRole.ADMIN,
        },
      ];

      authProviderRender(
        <TeamTable list={[]} inviteList={inviteList} role={MemberRole.ADMIN} />,
      );

      const editButtons = screen.queryAllByText('Edit');
      expect(editButtons).toHaveLength(3);

      const deleteButtons = screen.queryAllByText('Remove');
      expect(deleteButtons).toHaveLength(3);
    });

    it('should open and close dialogs correctly', async () => {
      const list: IMember[] = [
        {
          memberId: 'member-1',
          email: 'random@example.com',
          role: MemberRole.ADMIN,
        },
      ];

      authProviderRender(
        <TeamTable list={list} inviteList={[]} role={MemberRole.ADMIN} />,
      );

      // Invite member
      const inviteButton = screen.getByText('Invite member');
      await userEvent.click(inviteButton);

      let dialogTitle = screen.queryByRole('dialog', {
        name: 'Invite member',
      });
      expect(dialogTitle).toBeInTheDocument();

      // The cancel button inside the Dialog component and it only show when the user open it.
      let cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);
      // After closing the dialog, it shouldn't show the cancel button anymore.
      expect(dialogTitle).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();

      // Remove member
      const removeButton = screen.getByText('Remove');
      await userEvent.click(removeButton);

      dialogTitle = screen.queryByRole('dialog', {
        name: 'Remove member',
      });
      expect(dialogTitle).toBeInTheDocument();

      // The cancel button inside the Dialog component and it only show when the user open it.
      cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);
      // After closing the dialog, it shouldn't show the cancel button anymore.
      expect(dialogTitle).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();

      // Edit member
      const editButton = screen.getByText('Edit');
      await userEvent.click(editButton);

      dialogTitle = screen.queryByRole('dialog', {
        name: 'Edit member',
      });
      expect(dialogTitle).toBeInTheDocument();

      // The cancel button inside the Dialog component and it only show when the user open it.
      cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);
      // After closing the dialog, it shouldn't show the cancel button anymore.
      expect(dialogTitle).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('should not display the transfer option when the user is not the owner', () => {
      authProviderRender(
        <TeamTable list={[]} inviteList={[]} role={MemberRole.ADMIN} />,
      );

      const transferOwnershipButton = screen.queryByRole('button', {
        name: 'Transfer ownership',
      });
      expect(transferOwnershipButton).not.toBeInTheDocument();
    });

    it('should not display the transfer option when the team does not have at least 2 members', () => {
      authProviderRender(
        <TeamTable
          list={[
            {
              email: 'user@example.com',
              memberId: 'user1',
              role: MemberRole.OWNER,
            },
          ]}
          inviteList={[]}
          role={MemberRole.OWNER}
        />,
      );

      const transferOwnershipButton = screen.queryByRole('button', {
        name: 'Transfer ownership',
      });
      expect(transferOwnershipButton).toBeDisabled();
    });

    it('should display the transfer option and open the transfer dialog', async () => {
      authProviderRender(
        <TeamTable
          list={[
            {
              email: 'user@example.com',
              memberId: 'user1',
              role: MemberRole.OWNER,
            },
            {
              email: 'user2@example.com',
              memberId: 'user2',
              role: MemberRole.ADMIN,
            },
          ]}
          inviteList={[]}
          role={MemberRole.OWNER}
        />,
      );

      const transferOwnershipButton = screen.getByRole('button', {
        name: 'Transfer ownership',
      });
      await userEvent.click(transferOwnershipButton);

      const dialogTitle = screen.queryByRole('dialog', {
        name: 'Transfer team ownership',
      });
      expect(dialogTitle).toBeInTheDocument();
    });

    it('should not show the action column when the user has a `READ_ONLY` role', () => {
      const list: IMember[] = [
        {
          memberId: 'member-1',
          email: 'random@example.com',
          role: MemberRole.ADMIN,
        },
      ];

      const inviteList: IMember[] = [
        {
          memberId: 'member-2',
          email: 'random2@example.com',
          role: MemberRole.ADMIN,
        },
      ];

      authProviderRender(
        <TeamTable
          list={list}
          inviteList={inviteList}
          role={MemberRole.READ_ONLY}
        />,
      );

      const actionColumn = screen.queryByText('Action');
      expect(actionColumn).not.toBeInTheDocument();

      const inviteButton = screen.queryByText('Invite member');
      expect(inviteButton).not.toBeInTheDocument();

      const editButton = screen.queryByText('Edit');
      expect(editButton).not.toBeInTheDocument();

      const removeButton = screen.queryByText('Remove');
      expect(removeButton).not.toBeInTheDocument();
    });
  });
});
