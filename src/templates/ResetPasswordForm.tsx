import Link from 'next/link';

import { Button } from '../button/Button';
import { FormElement } from '../form/FormElement';
import { Label } from '../form/Label';
import { FullCenterSection } from '../layout/FullCenterSection';

const ResetPasswordForm = () => (
  <FullCenterSection title="Forgot your password?">
    <form className="text-left grid gap-y-2">
      <Label htmlFor="email">Email</Label>
      <FormElement>
        <input id="email" type="text" />
      </FormElement>

      <div className="mt-3">
        <button type="submit" className="w-full">
          <Button full>Send reset instructions</Button>
        </button>
      </div>
    </form>

    <div className="mt-5 text-xs">
      <div>
        <Link href="/login">
          <a className="text-primary-500 hover:text-primary-600">
            Go back to login
          </a>
        </Link>
      </div>
    </div>
  </FullCenterSection>
);

export { ResetPasswordForm };
