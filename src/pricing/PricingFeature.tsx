type IPricingFeatureProps = {
  children: string;
};

/**
 * Feature listed in pricing card explain what is included in the subscription plan.
 * @component
 */
const PricingFeature = (props: IPricingFeatureProps) => (
  <li className="mt-2 flex items-center">
    <svg
      className="mr-2 size-6 stroke-current stroke-2 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12l5 5L20 7" />
    </svg>
    {props.children}
  </li>
);

export { PricingFeature };
