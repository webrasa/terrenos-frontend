type ISubscriptionPrice = {
  [k: string]: {
    [k: string]: string;
  };
};

// If needed you can add more plan or remove plan.
// The `priceId` is generated by Stripe when you create a product with a price.
// Please check the `Nextless-Quick-Start` repo on how to generate the `priceId` from Stripe.
export const SubscriptionPrice: ISubscriptionPrice = {
  dev: {
    pro: 'price_1KTXGwDxtHLZXYoxfKzwYezO', // FIXME: Add your Stripe Subscription `priceId`
    business: 'price_1KTXHuDxtHLZXYoxwOIhEfD1', // FIXME: Add your Stripe Subscription `priceId`
    // You can add more subscription plan for example `enterprise`
  },
  prod: {
    pro: '', // FIXME: Add your Stripe Subscription `priceId`
    business: '', // FIXME: Add your Stripe Subscription `priceId`
  },
};

/**
 * Load priceId based on selected `plan` and environment.
 * @param {string} plan - Subscription plan name.
 */
export const getPriceIdFromName = (plan: string) => {
  const env = process.env.NEXT_PUBLIC_SUBSCRIPTION_PRICE_ENV;

  if (!env) {
    throw new Error("Subscription Price: environment variable isn't defined");
  }

  const priceEnv = SubscriptionPrice[env];

  if (!priceEnv) {
    throw new Error("Subscription Price: this environment isn't supported");
  }

  const priceId = priceEnv[plan];

  if (!priceId) {
    throw new Error(
      "Subscription Price: this plan doesn't exists in this environment"
    );
  }

  return priceId;
};
