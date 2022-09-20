import '__mocks__/intersectionObserverMock';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  describe('Render method', () => {
    it('should have the dialog in hidden status', () => {
      render(
        <ConfirmDialog
          title="Random title"
          description="Random description"
          show={false}
          handleCancel={() => {}}
          button={'button'}
        />
      );

      const title = screen.queryByText('Random title');
      expect(title).not.toBeInTheDocument();
    });

    it('should trigger the callback when the user click on cancel button', async () => {
      const handleCancel = jest.fn();

      render(
        <ConfirmDialog
          title="Random title"
          description="Random description"
          show={true}
          handleCancel={handleCancel}
          button={'button'}
        />
      );

      const title = screen.queryByText('Random title');
      expect(title).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      expect(handleCancel).toHaveBeenCalled();
    });

    it('should display form global error when an error occurs', () => {
      render(
        <ConfirmDialog
          title="Random title"
          description="Random description"
          show={true}
          formGlobalError="random_global_error"
          handleCancel={() => {}}
          button={'button'}
        />
      );

      const formGlobalError = screen.queryByText(
        'Unexpected error occurred, please try again'
      );
      expect(formGlobalError).toBeInTheDocument();
    });
  });
});
