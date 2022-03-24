import { BillingSettings, IBillingSettingsProps } from './BillingSettings';

const AccountSettings = (props: IBillingSettingsProps) => (
  <>
    <BillingSettings settings={props.settings} />
  </>
);

export { AccountSettings };
