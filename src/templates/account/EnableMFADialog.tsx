import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'react-qr-code';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { UserInfoSettingsState } from '@/types/UserInfoSettingsState';
import { mapAmplifyMessageSettings } from '@/utils/AmplifyMessageMap';
import { AppConfig } from '@/utils/AppConfig';

type IEnableMFAForm = {
  code: string;
};

type IEnableMFADialogProps = {
  show: boolean;
  handleDialogState: (displayState: UserInfoSettingsState) => void;
  handleCloseDialog: () => void;
};

const EnableMFADialog = (props: IEnableMFADialogProps) => {
  const { register, handleSubmit } = useForm<IEnableMFAForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);
  const [qrCodeValue, setQrCodeValue] = useState<string>('');
  const { providerInfo } = useAuth();

  useEffect(() => {
    const setupTOTP = async () => {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.setPreferredMFA(user, 'NOMFA');

      setQrCodeValue(await Auth.setupTOTP(user));
    };

    if (props.show) {
      setupTOTP();
    }
  }, [props.show]);

  const enableMFAAsync = useAsync(async (data: IEnableMFAForm) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.verifyTotpToken(user, data.code);

      await Auth.setPreferredMFA(user, 'TOTP');

      props.handleDialogState(UserInfoSettingsState.ENABLE_MFA_SUCCESS);
    } catch (err) {
      setFormGlobalError(mapAmplifyMessageSettings(err));
    }
  });

  const handleSubmitDialog = handleSubmit(async (data) => {
    await enableMFAAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={enableMFAAsync.pending}
      error={formGlobalError}
      title="Enable Two-Factor Authentication"
      description="Use an authenticator app to scan the QR code, then enter the 6-digit code in the field below."
      submitText="Enable"
    >
      <>
        <div className="mt-3">
          <QRCode
            value={`otpauth://totp/${AppConfig.site_name}:${providerInfo.email}?secret=${qrCodeValue}&issuer=${AppConfig.site_name}`}
            size={128}
          />
        </div>

        <Label htmlFor="code">Two-Factor code</Label>
        <FormElement>
          <input id="code" type="text" {...register('code')} />
        </FormElement>
      </>
    </FormDialog>
  );
};

export { EnableMFADialog };
