import { mockUseRouterPush } from '__mocks__/next/router';
import { screen } from '@testing-library/react';

import { GlobalRole } from '@/types/Auth';
import { authProviderRender } from '@/utils/TestUtils.test';

import { RequiredSuperAdmin } from './RequiredSuperAdmin';

describe('RequiredSuperAdmin', () => {
  describe('Render method', () => {
    it('should redirect the user to access denied page when the user is not a super admin', () => {
      authProviderRender(
        <RequiredSuperAdmin>Random children</RequiredSuperAdmin>,
      );

      expect(mockUseRouterPush).toHaveBeenCalledWith(
        '/admin-dashboard/access-denied',
      );
    });

    it('should not redirect when the user is a super admin', () => {
      authProviderRender(
        <RequiredSuperAdmin>Random children</RequiredSuperAdmin>,
        {
          globalRole: GlobalRole.SUPER_ADMIN,
        },
      );

      const children = screen.queryByText('Random children');
      expect(children).toBeInTheDocument();
    });
  });
});
