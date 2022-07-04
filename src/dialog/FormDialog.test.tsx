import '__mocks__/intersectionObserverMock';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormDialog } from './FormDialog';

describe('FormDialog', () => {
  describe('Render method', () => {
    it('should have the dialog in hidden status', () => {
      render(
        <FormDialog
          title="Random title"
          description="Random description"
          isSubmitting={false}
          show={false}
          handleCancel={() => {}}
          handleSubmit={() => {}}
        >
          Random children
        </FormDialog>
      );

      const title = screen.queryByText('Random title');
      expect(title).not.toBeInTheDocument();
    });

    it('should show the cancel button by default and able to click on it', async () => {
      const handleCancel = jest.fn();

      render(
        <FormDialog
          title="Random title"
          description="Random description"
          isSubmitting={false}
          show={true}
          handleCancel={handleCancel}
          handleSubmit={() => {}}
        >
          Random children
        </FormDialog>
      );

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await userEvent.click(cancelButton);

      expect(handleCancel).toBeCalled();
    });

    it('should hide the cancel button', async () => {
      render(
        <FormDialog
          title="Random title"
          description="Random description"
          isSubmitting={false}
          show={true}
          handleCancel={() => {}}
          handleSubmit={() => {}}
          hideCancelButton={true}
        >
          Random children
        </FormDialog>
      );

      const cancelButton = screen.queryByRole('button', { name: 'Cancel' });
      expect(cancelButton).not.toBeInTheDocument();
    });

    it('should trigger the submit callback when the user click on save button', async () => {
      // `e.preventDefault` remove the following error: `Not implemented: HTMLFormElement.prototype.requestSubmit`
      // For more information at: https://stackoverflow.com/questions/62216232/error-not-implemented-htmlformelement-prototype-submit?answertab=trending#tab-top
      const handleSubmit = jest.fn().mockImplementation((e) => {
        e.preventDefault();
      });

      render(
        <FormDialog
          title="Random title"
          description="Random description"
          isSubmitting={false}
          show={true}
          handleCancel={() => {}}
          handleSubmit={handleSubmit}
        >
          Random children
        </FormDialog>
      );

      const saveButton = screen.getByRole('button', { name: 'Save' });
      await userEvent.click(saveButton);

      expect(handleSubmit).toBeCalled();
    });

    it("shouldn't be able to click on the buttons when the submit callback is processing", async () => {
      const handleSubmit = jest.fn();
      const handleCancel = jest.fn();

      // Use a random button to avoid warning related to headless-ui a11y check
      render(
        <FormDialog
          title="Random title"
          description="Random description"
          isSubmitting={true}
          show={true}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        >
          <button>Random children</button>
        </FormDialog>
      );

      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeDisabled();

      await userEvent.click(saveButton);
      expect(handleSubmit).not.toBeCalled();

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      expect(cancelButton).toBeDisabled();

      await userEvent.click(cancelButton);
      expect(handleCancel).not.toBeCalled();
    });
  });
});
