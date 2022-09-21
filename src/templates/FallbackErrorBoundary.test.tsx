import { mockReload } from '__mocks__/next/router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FallbackErrorBoundary } from './FallbackErrorBoundary';

describe('FallbackErrorBoundary', () => {
  describe('Render method', () => {
    it('should render the fallbackErrorBoundary component and reload the page when the user click the main button', async () => {
      render(<FallbackErrorBoundary />);

      const title = screen.queryByText('An error occurred');
      expect(title).toBeInTheDocument();

      const button = screen.getByRole('button', {
        name: 'Reload the page and switch team',
      });
      await userEvent.click(button);

      expect(mockReload).toHaveBeenCalled();
    });
  });
});
