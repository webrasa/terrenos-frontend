import classNames from 'classnames';
import type { ReactNode } from 'react';

type IPricingCardProps = {
  name: string;
  price: string;
  periodicity: string;
  button: ReactNode;
  popular?: boolean;
  children: ReactNode;
};

/**
 * Pricing card component for one subscription plan with price, feature list, etc.
 * @component
 * @params props - Component props.
 * @param props.name - Subscription plan name.
 * @param props.price - Subscription plan price.
 * @param props.periodicity - The billing period: monthly, annually, etc.
 * @param props.button - Button to display.
 * @param props.popular - Indicates if the subscription plan is popular.
 * @param props.children - Children components.
 */
const PricingCard = (props: IPricingCardProps) => {
  const pricingCardClass = classNames(
    'p-8',
    'flex',
    'flex-col',
    'justify-center',
    'border-2',
    'border-gray-200',
    'rounded-md',
    'bg-white',
    'hover:shadow',
    {
      transform: props.popular,
      'scale-105': props.popular,
      'z-10': props.popular,
    },
  );

  const cardNameClass = classNames(
    'text-center',
    'text-2xl',
    'font-semibold',
    'text-gray-700',
    {
      'mt-4': props.popular,
    },
  );

  return (
    <div className={pricingCardClass} data-testid="pricing-card">
      {props.popular && (
        <div className="self-center rounded-full bg-primary-200 px-3 py-1 text-sm font-semibold tracking-wider text-primary-600">
          Best Value
        </div>
      )}

      <div className={cardNameClass}>{props.name}</div>

      <div className="flex items-center justify-center text-center">
        <span className="text-5xl font-bold leading-tight text-gray-900">
          {props.price}
        </span>
        <span className="ml-1">{`/ ${props.periodicity}`}</span>
      </div>

      <ul className="mb-8 mt-4">{props.children}</ul>

      {props.button}
    </div>
  );
};

export { PricingCard };
