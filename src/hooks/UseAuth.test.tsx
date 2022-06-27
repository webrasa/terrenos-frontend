import { mockUseRouterPush } from '__mocks__/next/router';
import { render, screen, waitFor } from '@testing-library/react';

import { AuthProvider } from './UseAuth';

describe('UseAuth', () => {
  describe('AuthProvider without endpoint', () => {
    it('should start by returning `null` and wait asynchronously for user info', async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        expect(mockUseRouterPush).not.toBeCalled();
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });

    it("should return `null` and redirect to login page when the user isn't signed in", async () => {
      const { container } = render(<AuthProvider>Protected</AuthProvider>);

      await waitFor(() => {
        expect(mockUseRouterPush).toBeCalledWith('/login');
      });

      expect(container).toBeEmptyDOMElement();

      const content = screen.queryByText('Protected');
      expect(content).not.toBeInTheDocument();
    });
  });
});
