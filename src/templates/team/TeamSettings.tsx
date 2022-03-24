import { BillingSettings, IBillingSettingsProps } from './BillingSettings';

const TeamSettings = (props: IBillingSettingsProps) => (
  <>
    <BillingSettings settings={props.settings} />
  </>
);

export { TeamSettings };
