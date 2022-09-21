import { API } from 'aws-amplify';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { CenterSection } from '@/layout/CenterSection';
import { getShell } from '@/layout/Shell';
import { PricingModel } from '@/templates/PricingModel';
import type { NextPageWithLayout } from '@/utils/NextLayout';
import getStripe from '@/utils/StripeClient';
import { getPriceIdFromName } from '@/utils/SubscriptionPrice';

const Upgrade: NextPageWithLayout = () => {
  const { currentTeam } = useAuth();

  const subscribeAsync = useAsync(async (priceId: string) => {
    const checkoutResult = await API.post(
      'backend',
      `/${currentTeam.id}/billing/create-checkout-session`,
      {
        body: {
          priceId,
        },
      }
    );

    const stripe = await getStripe();

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: checkoutResult.sessionId });

      throw new Error(
        'redirectToCheckout fails due to a browser or network error'
      );
    } else {
      throw new Error('Impossible to load Stripe');
    }
  });

  const handleSubscribe = async (
    event: React.MouseEvent<HTMLElement>,
    plan: string
  ) => {
    event.preventDefault();
    await subscribeAsync.execute(getPriceIdFromName(plan));
  };

  return (
    <CenterSection>
      <Alert text="Test mode: you can use '4242 4242 4242 4242' as your credit card number for Stripe." />

      <div className="mt-5 grid w-full max-w-4xl grid-cols-1 gap-y-12 md:grid-cols-3">
        <PricingModel
          button={
            <Button full secondary>
              Current Plan
            </Button>
          }
          button2={
            <button
              type="button"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleSubscribe(event, 'pro');
              }}
              disabled={subscribeAsync.pending}
            >
              <Button full>Choose This Plan</Button>
            </button>
          }
          button3={
            <button
              type="button"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleSubscribe(event, 'business');
              }}
              disabled={subscribeAsync.pending}
            >
              <Button full>Choose This Plan</Button>
            </button>
          }
        />
      </div>
    </CenterSection>
  );
};

Upgrade.getLayout = getShell('Upgrade');

export default Upgrade;
