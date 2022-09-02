import '__mocks__/intersectionObserverMock';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemberRole } from '@/types/IMember';
import type { ITodo } from '@/types/ITodo';
import { authProviderRender } from '@/utils/TestUtils';

import { Table } from './Table';

describe('Table', () => {
  describe('Render method', () => {
    it("shouldn't show any action buttons when the list is empty", () => {
      const list: ITodo[] = [];

      authProviderRender(<Table list={list} role={MemberRole.ADMIN} />);

      const editButton = screen.queryByText('Edit');
      expect(editButton).not.toBeInTheDocument();

      const deleteButton = screen.queryByText('Delete');
      expect(deleteButton).not.toBeInTheDocument();
    });

    it('should show delete when the list contains data', () => {
      const list: ITodo[] = [
        {
          id: 'RANDOM_TODO_ID',
          title: 'RANDOM_TODO_TITLE',
        },
        {
          id: 'RANDOM_TODO_ID2',
          title: 'RANDOM_TODO_TITLE',
        },
        {
          id: 'RANDOM_TODO_ID3',
          title: 'RANDOM_TODO_TITLE',
        },
      ];

      authProviderRender(<Table list={list} role={MemberRole.ADMIN} />);

      const editButtons = screen.queryAllByText('Edit');
      expect(editButtons).toHaveLength(3);

      const deleteButtons = screen.queryAllByText('Delete');
      expect(deleteButtons).toHaveLength(3);
    });

    it('should show the delete dialog and close it', async () => {
      const list: ITodo[] = [
        {
          id: 'RANDOM_TODO_ID',
          title: 'RANDOM_TODO_TITLE',
        },
      ];

      authProviderRender(<Table list={list} role={MemberRole.ADMIN} />);

      const deleteButton = screen.getByText('Delete');
      await userEvent.click(deleteButton);

      // The cancel button inside the Dialog component and it only show when the user open it.
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      // After closing the dialog, it shouldn't show the cancel button anymore.
      expect(cancelButton).not.toBeInTheDocument();
    });
  });
});
