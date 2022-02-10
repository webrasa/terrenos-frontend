import {
  BillingSettings,
  IBillingSettingsProps,
} from './settings/BillingSettings';
import { UserInfoSettings } from './settings/UserInfoSettings';

const AccountSettings = (props: IBillingSettingsProps) => (
  <>
    <UserInfoSettings />
    <BillingSettings settings={props.settings} />
  </>
);

export { AccountSettings };
