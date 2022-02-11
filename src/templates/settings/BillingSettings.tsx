import { MouseEventHandler } from 'react';

import { API } from 'aws-amplify';
import Link from 'next/link';

import { Button } from '../../button/Button';
import { useAsync } from '../../hooks/UseAsync';
import { CardSection } from '../../layout/CardSection';
import { UsageStats } from '../../stats/UsageStats';
import { SubscriptionPlan } from '../../types/SubscriptionPlan';

export type ISettings = {
  planId: string;
  planName: string;
  hasStripeCustomerId: boolean;
};

export type IBillingSettingsProps = {
  settings: ISettings;
};

const BillingSettings = (props: IBillingSettingsProps) => {
  const customerPortalAsync = useAsync(async () => {
    const customerPortalResult = await API.post(
      'backend',
      '/billing/customer-portal',
      null
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
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div>Your Plan</div>
          <div className="flex space-x-2">
            {props.settings.hasStripeCustomerId && (
              <button
                type="button"
                onClick={handleCustomerPortal}
                disabled={customerPortalAsync.pending}
              >
                <Button sm secondary>
                  Manage Plan
                </Button>
              </button>
            )}

            {props.settings.planId === SubscriptionPlan.FREE && (
              <Link href="/dashboard/upgrade">
                <a>
                  <Button sm>Upgrade Plan</Button>
                </a>
              </Link>
            )}
          </div>
        </div>
      }
    >
      <div className="text-xl font-bold text-gray-900">
        {props.settings.planName} plan
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
        <UsageStats title="Random Stats" count={10} limit="1000 limit" />
        <UsageStats title="Random Stats 2" count={23} limit="100 limit" />
        <UsageStats title="Random Stats 3" count={400} limit="10000 limit" />
      </div>
    </CardSection>
  );
};

export { BillingSettings };
