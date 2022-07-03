import { screen } from '@testing-library/react';

import { SubscriptionPlan } from '@/types/SubscriptionPlan';
import { authProviderRender } from '@/utils/TestUtils';

import { BillingSettings } from './BillingSettings';

describe('BillingSettings', () => {
  describe('Render method', () => {
    it('should render the upgrade button when the user is on the free plan', () => {
      authProviderRender(
        <BillingSettings
          settings={{
            planId: SubscriptionPlan.FREE,
            planName: 'RANDOM_PLAN_NAME',
            hasStripeCustomerId: false,
          }}
        />
      );

      const manageButton = screen.queryByRole('button', {
        name: 'Manage Plan',
      });
      expect(manageButton).not.toBeInTheDocument();

      const upgradeLink = screen.queryByRole('link', { name: 'Upgrade Plan' });
      expect(upgradeLink).toBeInTheDocument();
    });

    it("shouldn't render the upgrade button when the user isn't on the free plan", () => {
      authProviderRender(
        <BillingSettings
          settings={{
            planId: SubscriptionPlan.PRO,
            planName: 'RANDOM_PLAN_NAME',
            hasStripeCustomerId: false,
          }}
        />
      );

      const manageButton = screen.queryByRole('button', {
        name: 'Manage Plan',
      });
      expect(manageButton).not.toBeInTheDocument();

      const upgradeLink = screen.queryByRole('link', { name: 'Upgrade Plan' });
      expect(upgradeLink).not.toBeInTheDocument();
    });

    it('should render the manage button when the user has a Stripe ID', () => {
      authProviderRender(
        <BillingSettings
          settings={{
            planId: SubscriptionPlan.PRO,
            planName: 'RANDOM_PLAN_NAME',
            hasStripeCustomerId: true,
          }}
        />
      );

      const manageButton = screen.queryByRole('button', {
        name: 'Manage Plan',
      });
      expect(manageButton).toBeInTheDocument();
    });
  });
});
