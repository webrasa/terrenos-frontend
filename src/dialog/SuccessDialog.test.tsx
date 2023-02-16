import '__mocks__/intersectionObserverMock';

import { render, screen } from '@testing-library/react';

import { SuccessDialog } from './SuccessDialog';

describe('SuccessDialog', () => {
  describe('Render method', () => {
    it('should have the dialog in hidden status', () => {
      render(
        <SuccessDialog
          show={false}
          handleClose={() => {}}
          title="Random title"
          description="Random description"
          action={<button>Button</button>}
        />
      );

      const title = screen.queryByText('Random title');
      expect(title).not.toBeInTheDocument();
    });

    it('should display the dialog with title, description and action', () => {
      render(
        <SuccessDialog
          show={true}
          handleClose={() => {}}
          title="Random title"
          description="Random description"
          action={<button>Button</button>}
        />
      );

      const title = screen.queryByText('Random title');
      expect(title).toBeInTheDocument();

      const description = screen.queryByText('Random description');
      expect(description).toBeInTheDocument();

      const action = screen.getByRole('button', { name: 'Button' });
      expect(action).toBeInTheDocument();
    });
  });
});
