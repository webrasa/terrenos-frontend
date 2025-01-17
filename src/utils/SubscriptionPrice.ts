type ISubscriptionPrice = {
  [k: string]: {
    [k: string]: string;
  };
};

// If needed you can add more plan or remove plan.
// The `priceId` is generated by Stripe when you create a product with a price.
// Please check the `Terrenoss-Quick-Start` repo on how to generate the `priceId` from Stripe.
export const SubscriptionPrice: ISubscriptionPrice = {
  dev: {
    pro: 'price_1M4pljARauCrL6c2Kwj45IYx', // FIXME: Add your Stripe Subscription `priceId`
    business: 'price_1M4pnFARauCrL6c2PXwhEcb9', // FIXME: Add your Stripe Subscription `priceId`
    // You can add more subscription plan for example `enterprise`
  },
  prod: {
    pro: '', // FIXME: Add your Stripe Subscription `priceId`
    business: '', // FIXME: Add your Stripe Subscription `priceId`
  },
};

/**
 * Load priceId based on selected `plan` and environment.
 * @param plan - Subscription plan name.
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
      "Subscription Price: this plan doesn't exists in this environment",
    );
  }

  return priceId;
};
