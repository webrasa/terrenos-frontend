import type { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { FullCenterSection } from '@/layouts/FullCenterSection';
import { mapAmplifyMessage } from '@/utils/AmplifyMessageMap';

type IChallengeMFAForm = {
  mfaCode: string;
};

type IChallengeMFAFormProps = {
  user: CognitoUser;
};

const ChallengeMFAForm = (props: IChallengeMFAFormProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IChallengeMFAForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const verifyMfaCodeAsync = useAsync(async (data: IChallengeMFAForm) => {
    try {
      await Auth.confirmSignIn(props.user, data.mfaCode, 'SOFTWARE_TOKEN_MFA');

      await router.push('/dashboard');
    } catch (err) {
      setFormGlobalError(mapAmplifyMessage(err));
    }
  });

  const handleVerify = handleSubmit(async (data) => {
    await verifyMfaCodeAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Two-Factor Authentication"
      description="Enter the 6-digit code from your authenticator app."
    >
      {formGlobalError && <Alert text={formGlobalError} />}

      <form className="grid gap-y-2" onSubmit={handleVerify}>
        <Label htmlFor="mfaCode">Two-Factor code</Label>
        <FormElement>
          <input id="mfaCode" type="text" {...register('mfaCode')} />
        </FormElement>

        <div className="mt-3 text-center">
          <button
            type="submit"
            className="w-full"
            disabled={verifyMfaCodeAsync.pending}
          >
            <Button full loading={verifyMfaCodeAsync.pending}>
              Verify
            </Button>
          </button>
        </div>
      </form>
    </FullCenterSection>
  );
};

export { ChallengeMFAForm };
