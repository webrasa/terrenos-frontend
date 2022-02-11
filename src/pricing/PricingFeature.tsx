type IPricingFeatureProps = {
  children: string;
};

const PricingFeature = (props: IPricingFeatureProps) => (
  <li className="flex items-center mt-2">
    <svg
      className="mr-2 w-6 h-6 text-green-500 stroke-current stroke-2"
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
