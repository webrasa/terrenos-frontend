import { useRouter } from 'next/router';

import { Button } from '@/button/Button';
import { SuccessDialog } from '@/dialog/SuccessDialog';

type IEnableMFASuccessProps = {
  show: boolean;
};

const EnableMFASuccess = (props: IEnableMFASuccessProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.reload();
  };

  return (
    <SuccessDialog
      show={props.show}
      handleClose={handleClose}
      title="Two-Factor Authentication has been enabled"
      description="Your account security is our top priority. Any sign-in attempts will require both your password and a Two-Factor code."
      action={
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a href="/">
          <Button sm>Go back to Account Settings</Button>
        </a>
      }
    />
  );
};

export { EnableMFASuccess };
