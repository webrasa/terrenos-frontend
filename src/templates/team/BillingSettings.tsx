import { API } from 'aws-amplify';
import type { MouseEventHandler } from 'react';

import { Button } from '@/button/Button';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { CardSection } from '@/layout/CardSection';
import { DisableableLink } from '@/link/DisableableLink';
import { UsageStats } from '@/stats/UsageStats';
import { UpgradeTooltip } from '@/tooltip/UpgradeTooltip';
import { MemberRole } from '@/types/IMember';
import { SubscriptionPlan } from '@/types/SubscriptionPlan';
import { requiredRoles } from '@/utils/Auth';

export type ISettings = {
  planId: string;
  planName: string;
  hasStripeCustomerId: boolean;
  role: MemberRole;
};

export type IBillingSettingsProps = {
  settings: ISettings;
};

const BillingSettings = (props: IBillingSettingsProps) => {
  const { currentTeam } = useAuth();
  const customerPortalAsync = useAsync(async () => {
    const customerPortalResult = await API.post(
      'backend',
      `/${currentTeam.id}/billing/customer-portal`,
      {}
    );

    window.location.assign(customerPortalResult.url);
  });

  const handleCustomerPortal: MouseEventHandler = async (event) => {
    event.preventDefault();
    await customerPortalAsync.execute();
  };

  return (
    <CardSection
      title={
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>Billing</div>
          <div className="flex flex-wrap gap-y-1 gap-x-2">
            {props.settings.hasStripeCustomerId && (
              <UpgradeTooltip
                hideLabel={
                  requiredRoles(
                    [MemberRole.OWNER, MemberRole.ADMIN],
                    props.settings.role
                  ) || customerPortalAsync.pending
                }
              >
                <button type="button" onClick={handleCustomerPortal}>
                  <Button sm secondary>
                    Manage Plan
                  </Button>
                </button>
              </UpgradeTooltip>
            )}

            {props.settings.planId === SubscriptionPlan.FREE && (
              <UpgradeTooltip
                hideLabel={requiredRoles(
                  [MemberRole.OWNER, MemberRole.ADMIN],
                  props.settings.role
                )}
              >
                <DisableableLink href="/dashboard/upgrade">
                  <Button sm>Upgrade Plan</Button>
                </DisableableLink>
              </UpgradeTooltip>
            )}
          </div>
        </div>
      }
    >
      <div className="text-xl font-bold text-gray-900">
        {props.settings.planName} plan
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UsageStats title="Random Stats" count={10} limit="1000 limit" />
        <UsageStats title="Random Stats 2" count={23} limit="100 limit" />
        <UsageStats title="Random Stats 3" count={400} limit="10000 limit" />
      </div>
    </CardSection>
  );
};

export { BillingSettings };
