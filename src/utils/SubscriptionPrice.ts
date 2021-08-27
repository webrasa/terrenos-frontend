type ISubscriptionPriceEnv = {
  [k: string]: {
    [k: string]: string;
  };
};

// If needed you can add more plan or remove plan
export const SubscriptionPrice: ISubscriptionPriceEnv = {
  dev: {
    pro: '', // FIXME: Add Stripe Subscription `priceId`
    business: '', // FIXME: Add Stripe Subscription `priceId`
  },
  prod: {
    pro: '', // FIXME: Add Stripe Subscription `priceId`
    business: '', // FIXME: Add Stripe Subscription `priceId`
  },
};

export const getSubscriptionPrice = (plan: string) => {
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
