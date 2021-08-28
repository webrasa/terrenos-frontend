import { API } from 'aws-amplify';

import { Button } from '../../button/Button';
import { useAsync } from '../../hooks/UseAsync';
import { CenterSection } from '../../layout/CenterSection';
import { getShell } from '../../layout/Shell';
import { PricingModel } from '../../templates/PricingModel';
import { NextPageWithLayout } from '../../utils/NextLayout';
import getStripe from '../../utils/StripeClient';
import { getPriceIdFromName } from '../../utils/SubscriptionPrice';

const Upgrade: NextPageWithLayout = () => {
  const subscribeAsync = useAsync(async (priceId: string) => {
    const checkoutResult = await API.post(
      'backend',
      '/billing/create-checkout-session',
      {
        body: {
          priceId,
        },
      }
    );

    const stripe = await getStripe();

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: checkoutResult.sessionId });
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
    </CenterSection>
  );
};

Upgrade.getLayout = getShell('Upgrade');

export default Upgrade;
