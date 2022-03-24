import { useAuth } from '../../hooks/UseAuth';
import { BillingSettings, IBillingSettingsProps } from './BillingSettings';
import { UserInfoSettings } from './UserInfoSettings';

const AccountSettings = (props: IBillingSettingsProps) => {
  const auth = useAuth();

  return (
    <>
      {!auth.providerInfo.identities && <UserInfoSettings />}
      <BillingSettings settings={props.settings} />
    </>
  );
};

export { AccountSettings };
