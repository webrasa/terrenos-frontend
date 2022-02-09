import { MouseEventHandler, useState } from 'react';

import { API } from 'aws-amplify';
import Link from 'next/link';

import { AccountSettingLine } from '../account/AccountSettingLine';
import { Button } from '../button/Button';
import { useAsync } from '../hooks/UseAsync';
import { useAuth } from '../hooks/UseAuth';
import { CardSection } from '../layout/CardSection';
import { UsageStats } from '../stats/UsageStats';
import { SettingsDialogState } from '../types/SettingsDialogState';
import { SubscriptionPlan } from '../types/SubscriptionPlan';
import { ChangeEmail } from './settings/ChangeEmail';
import { ChangePassword } from './settings/ChangePassword';
import { ChangePasswordSuccess } from './settings/ChangePasswordSuccess';
import { ConfirmChangeEmail } from './settings/ConfirmChangeEmail';

export type ISettings = {
  planId: string;
  planName: string;
  hasStripeCustomerId: boolean;
};

type IAccountSettingsProps = {
  settings: ISettings;
};

const AccountSettings = (props: IAccountSettingsProps) => {
  const auth = useAuth();
  const [dialogState, setDialogState] = useState<SettingsDialogState>(
    SettingsDialogState.NONE
  );

  const customerPortalAsync = useAsync(async () => {
    const customerPortalResult = await API.post(
      'backend',
      '/billing/customer-portal',
      null
    );

    window.location.assign(customerPortalResult.url);
  });

  const handleCustomerPortal: MouseEventHandler = async (event) => {
    event.preventDefault();
    await customerPortalAsync.execute();
  };

  const handleDialogState = (state: SettingsDialogState) => {
    setDialogState(state);
  };

  const handleCloseDialog = () => {
    setDialogState(SettingsDialogState.NONE);
  };

  return (
    <>
      <CardSection title={<div>Your Account</div>}>
        <div className="space-y-6">
          <AccountSettingLine
            name="Email address"
            value={auth.providerInfo.email}
            action={
              <button
                type="button"
                onClick={() =>
                  handleDialogState(SettingsDialogState.CHANGE_EMAIL)
                }
              >
                <Button sm>Change</Button>
              </button>
            }
          />

          <AccountSettingLine
            name="Password"
            value="••••••••••••"
            action={
              <button
                type="button"
                onClick={() =>
                  handleDialogState(SettingsDialogState.CHANGE_PASSWORD)
                }
              >
                <Button sm>Change</Button>
              </button>
            }
          />
        </div>
      </CardSection>
      <CardSection
        title={
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div>Your Plan</div>
            <div className="flex space-x-2">
              {props.settings.hasStripeCustomerId && (
                <button
                  type="button"
                  onClick={handleCustomerPortal}
                  disabled={customerPortalAsync.pending}
                >
                  <Button sm secondary>
                    Manage Plan
                  </Button>
                </button>
              )}

              {props.settings.planId === SubscriptionPlan.FREE && (
                <Link href="/dashboard/upgrade">
                  <a>
                    <Button sm>Upgrade Plan</Button>
                  </a>
                </Link>
              )}
            </div>
          </div>
        }
      >
        <div className="text-xl font-bold text-gray-900">
          {props.settings.planName} plan
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UsageStats title="Random Stats" count={10} limit="1000 limit" />
          <UsageStats title="Random Stats 2" count={23} limit="100 limit" />
          <UsageStats title="Random Stats 3" count={400} limit="10000 limit" />
        </div>
      </CardSection>

      <ChangeEmail
        show={dialogState === SettingsDialogState.CHANGE_EMAIL}
        handleDialogState={handleDialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <ConfirmChangeEmail
        show={dialogState === SettingsDialogState.CONFIRM_CHANGE_EMAIL}
      />
      <ChangePassword
        show={dialogState === SettingsDialogState.CHANGE_PASSWORD}
        handleDialogState={handleDialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <ChangePasswordSuccess
        show={dialogState === SettingsDialogState.CHANGE_PASSWORD_SUCCESS}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { AccountSettings };
