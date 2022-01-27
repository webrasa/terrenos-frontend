import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';
import { FormElement } from '../form/FormElement';
import { Label } from '../form/Label';
import { FullCenterSection } from '../layout/FullCenterSection';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';

const ConfirmSignUp = () => {
  const router = useRouter();
  const email = `${router.query.email}`;

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.resendSignUp(email);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.confirmSignUp(email, '');

    await router.push('/login?email=devops@oufnix.com', '/login');
  };

  return (
    <div className="antialiased text-gray-900">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <FullCenterSection
        title="Verify your email"
        description="Enter the 6-digit verification code sent to your email to complete the signup."
      >
        <form className="text-left grid gap-y-2" onSubmit={handleVerify}>
          <Label htmlFor="code">Verification code</Label>
          <FormElement>
            <input id="code" type="text" />
          </FormElement>

          <div className="mt-3">
            <button type="submit" className="w-full">
              <Button full>Confirm</Button>
            </button>
          </div>
        </form>

        <div className="mt-5 text-xs">
          Didn&apos;t receive the email?{' '}
          <button
            className="text-primary-500 hover:text-primary-600"
            type="button"
            onClick={handleResend}
          >
            Resend a new code
          </button>
          .
        </div>
      </FullCenterSection>
    </div>
  );
};

export default ConfirmSignUp;
