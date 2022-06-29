import type { RenderOptions } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import { TestingAuthProvider } from '@/hooks/UseAuth';
import { SubscriptionPlan } from '@/types/SubscriptionPlan';

import { BillingSettings } from './BillingSettings';

const authProviderRender = (ui: ReactElement, renderOptions?: RenderOptions) =>
  render(<TestingAuthProvider>{ui}</TestingAuthProvider>, renderOptions);

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

      const manageButton = screen.queryByText('Manage Plan');
      expect(manageButton).not.toBeInTheDocument();

      const upgradeButton = screen.queryByText('Upgrade Plan');
      expect(upgradeButton).toBeInTheDocument();
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

      const manageButton = screen.queryByText('Manage Plan');
      expect(manageButton).not.toBeInTheDocument();

      const upgradeButton = screen.queryByText('Upgrade Plan');
      expect(upgradeButton).not.toBeInTheDocument();
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

      const manageButton = screen.queryByText('Manage Plan');
      expect(manageButton).toBeInTheDocument();
    });
  });
});
