import type { ReactNode } from 'react';

import { PricingCard } from '@/pricing/PricingCard';
import { PricingFeature } from '@/pricing/PricingFeature';

type IPricingModelProps = {
  button: ReactNode;
  button2: ReactNode;
  button3: ReactNode;
};

const PricingModel = (props: IPricingModelProps) => (
  <>
    <PricingCard name="FREE" price="$0" periodicity="mo" button={props.button}>
      <PricingFeature>1 Team Members</PricingFeature>
      <PricingFeature>1 Website</PricingFeature>
      <PricingFeature>1 GB Storage</PricingFeature>
      <PricingFeature>1 TB Transfer</PricingFeature>
      <PricingFeature>Email Support</PricingFeature>
    </PricingCard>
    <PricingCard
      name="PRO"
      price="$19"
      periodicity="mo"
      popular
      button={props.button2}
    >
      <PricingFeature>5 Team Members</PricingFeature>
      <PricingFeature>5 Website</PricingFeature>
      <PricingFeature>5 GB Storage</PricingFeature>
      <PricingFeature>5 TB Transfer</PricingFeature>
      <PricingFeature>Email Support</PricingFeature>
    </PricingCard>
    <PricingCard
      name="ENTERPRISE"
      price="$99"
      periodicity="mo"
      button={props.button3}
    >
      <PricingFeature>30 Team Members</PricingFeature>
      <PricingFeature>30 Website</PricingFeature>
      <PricingFeature>30 GB Storage</PricingFeature>
      <PricingFeature>30 TB Transfer</PricingFeature>
      <PricingFeature>Email Support</PricingFeature>
    </PricingCard>
  </>
);

export { PricingModel };
