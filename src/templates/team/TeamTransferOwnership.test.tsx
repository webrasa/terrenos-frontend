import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';

import { MemberRole } from '@/types/IMember';

import { TeamTransferOwnership } from './TeamTransferOwnership';

describe('TeamTransferOwnership', () => {
  describe('Render method', () => {
    it('should not render the content without OWNER role', () => {
      render(
        <TeamTransferOwnership
          enableTransfer={true}
          handleDialogState={() => {}}
          role={MemberRole.ADMIN}
        />
      );

      const content = screen.queryByText('Transfer ownership');
      expect(content).not.toBeInTheDocument();
    });

    it('should render the content with OWNER role and not be able to click the button when the option is disabled', async () => {
      const handleDialogState = jest.fn();

      render(
        <TeamTransferOwnership
          enableTransfer={false}
          handleDialogState={handleDialogState}
          role={MemberRole.OWNER}
        />
      );

      const content = screen.queryAllByText('Transfer ownership');

      assert(content !== null, 'The content is not found');
      expect(content.length).toEqual(2);

      const children = screen.getByRole('button', {
        name: 'Transfer ownership',
      });
      await userEvent.click(children);
      expect(handleDialogState).not.toHaveBeenCalled();

      const label = screen.queryByRole('tooltip');
      expect(label).toBeInTheDocument();
    });

    it('should render the content with OWNER role and be able to click the button when the option is enabled', async () => {
      const handleDialogState = jest.fn();

      render(
        <TeamTransferOwnership
          enableTransfer={true}
          handleDialogState={handleDialogState}
          role={MemberRole.OWNER}
        />
      );

      const content = screen.queryAllByText('Transfer ownership');

      assert(content !== null, 'The content is not found');
      expect(content.length).toEqual(2);

      const children = screen.getByRole('button', {
        name: 'Transfer ownership',
      });
      await userEvent.click(children);

      expect(handleDialogState).toHaveBeenCalled();

      const label = screen.queryByRole('tooltip');
      expect(label).not.toBeInTheDocument();
    });
  });
});
