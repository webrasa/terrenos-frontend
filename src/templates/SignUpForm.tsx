import Link from 'next/link';

import { Button } from '../button/Button';
import { FormElement } from '../form/FormElement';
import { Label } from '../form/Label';
import { FullCenterSection } from '../layout/FullCenterSection';

const SignUpForm = () => (
  <FullCenterSection title="Create new account">
    <form className="text-left grid gap-y-2">
      <Label htmlFor="email">Email address</Label>
      <FormElement>
        <input id="email" type="text" />
      </FormElement>

      <Label htmlFor="password">Password</Label>
      <FormElement>
        <input id="password" type="text" />
      </FormElement>

      <div className="mt-3">
        <button type="submit" className="w-full">
          <Button full>Sign up</Button>
        </button>
      </div>
    </form>

    <div className="mt-5 text-xs">
      <div>
        Already a member?{' '}
        <Link href="/login">
          <a className="text-primary-500 hover:text-primary-600">Log in now.</a>
        </Link>
      </div>
    </div>
  </FullCenterSection>
);

export { SignUpForm };
