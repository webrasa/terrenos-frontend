import { mockCurrentUserInfo } from '__mocks__/aws-amplify';
import { mockQuery } from '__mocks__/next/router';
import { render, screen, waitFor } from '@testing-library/react';

import type { IAuthProviderProps } from '@/hooks/UseAuth';
import Join from '@/pages-copy/join';

// Usually in testing, we use `TestingAuthProvider` to wrap component that use `useAuth`.
// But, in `join` page, it uses `AuthProvider` in the render method.
// So, it isn't possible to use `TestingAuthProvider` and we need to mock the import directly.
jest.mock('@/hooks/UseAuth', () => ({
  AuthProvider: (props: IAuthProviderProps) => {
    // False error from ESLint, we are working with React and not DOM directly.
    // eslint-disable-next-line testing-library/no-node-access
    return <div>{props.children}</div>;
  },
}));

// We also mock `Authenticated` component, it's a complex component to setup for testing and it's already covered by test.
jest.mock('@/templates/invite/Authenticated', () => ({
  Authenticated: () => {
    return <div>Authenticated component mocked</div>;
  },
}));

describe('Join page', () => {
  describe('Render page', () => {
    it('should start with empty content and wait asynchronously to check if the user is signed in or not', async () => {
      mockQuery.mockReturnValue({});
      const { container } = render(<Join />);

      // Technically we don't need to waitFor for updated status.
      // But the render call setState and this is the reason we need `waitFor`
      await waitFor(() => {
        expect(container).toHaveTextContent('');
      });
    });

    it("should render a page inviting the user to sign in and session storage shouldn't be called when there is no query", async () => {
      const mockSetItem = jest.fn();

      // Object.getPrototypeOf is the modern way of __proto__
      Object.getPrototypeOf(window.sessionStorage).setItem = mockSetItem;

      mockQuery.mockReturnValue({});
      render(<Join />);

      await waitFor(() => {
        const goLoginLink = screen.queryByRole('link', {
          name: 'Create an account or login to join',
        });
        expect(goLoginLink).toBeInTheDocument();
      });

      expect(mockSetItem).not.toHaveBeenCalled();
    });

    it('should render a page inviting the user to sign in and save the query in session storage', async () => {
      const mockSetItem = jest.fn();

      // Object.getPrototypeOf is the modern way of __proto__
      Object.getPrototypeOf(window.sessionStorage).setItem = mockSetItem;

      mockQuery.mockReturnValue({
        teamId: 'RANDOM_TEAM_ID',
        verificationCode: 'RANDOM_VERIFICATION_CODE',
      });
      render(<Join />);

      await waitFor(() => {
        const goLoginLink = screen.queryByRole('link', {
          name: 'Create an account or login to join',
        });
        expect(goLoginLink).toBeInTheDocument();
      });

      expect(mockSetItem).toHaveBeenCalled();
      expect(mockSetItem.mock.calls[0][0]).toEqual('join-team-path');
      expect(mockSetItem.mock.calls[0][1]).toContain('RANDOM_TEAM_ID');
      expect(mockSetItem.mock.calls[0][1]).toContain(
        'RANDOM_VERIFICATION_CODE',
      );
    });

    it('should render the authenticated template when the user is already signed in', async () => {
      const mockRemoveItem = jest.fn();

      // Object.getPrototypeOf is the modern way of __proto__
      Object.getPrototypeOf(window.sessionStorage).removeItem = mockRemoveItem;

      mockCurrentUserInfo.mockReturnValue({
        attributes: {
          sub: 'RANDOM_USER_ATTRIBUTES_SUB',
          email: 'RANDOM_USER_ATTRIBUTES_EMAIL',
          identities: 'RANDOM_USER_ATTRIBUTES_IDENTITIES',
        },
      });
      render(<Join />);

      await waitFor(() => {
        expect(mockRemoveItem).toHaveBeenCalledWith('join-team-path');
      });

      const authenticated = screen.queryByText(
        'Authenticated component mocked',
      );
      expect(authenticated).toBeInTheDocument();
    });
  });
});
