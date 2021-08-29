import { ReactNode } from 'react';

import classNames from 'classnames';

type IPricingCardProps = {
  name: string;
  price: string;
  periodicity: string;
  button: ReactNode;
  popular?: boolean;
  children: ReactNode;
};

/**
 * @component
 * @params {Object} props - Component props.
 * @param {string} props.name - Subscription plan name.
 * @param {string} props.price - Subscription plan price.
 * @param {string} props.periodicity - The billing period: monthly, annually, etc.
 * @param {ReactNode} props.button - Button to display.
 * @param {boolean} props.popular - Indicates if the subscription plan is popular.
 * @param {ReactNode} props.children - Children components.
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
    }
  );

  const cardNameClass = classNames(
    'text-center',
    'text-2xl',
    'font-semibold',
    'text-gray-700',
    {
      'mt-4': props.popular,
    }
  );

  return (
    <div className={pricingCardClass}>
      {props.popular && (
        <div className="self-center bg-primary-200 rounded-full px-3 py-1 text-sm font-semibold text-primary-600 tracking-wider">
          Best Value
        </div>
      )}

      <div className={cardNameClass}>{props.name}</div>

      <div className="text-center flex justify-center items-center">
        <span className="text-gray-900 text-5xl font-bold leading-tight">
          {props.price}
        </span>
        <span className="ml-1">{`/ ${props.periodicity}`}</span>
      </div>

      <ul className="mt-4 mb-8">{props.children}</ul>

      {props.button}
    </div>
  );
};

export { PricingCard };
