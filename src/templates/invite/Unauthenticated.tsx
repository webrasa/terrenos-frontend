import Link from 'next/link';

import { Button } from '../../button/Button';
import { FullCenterSection } from '../../layout/FullCenterSection';

const Unauthenticated = () => (
  <FullCenterSection title="Join team" description="Log in or sign in">
    <Link href="/login">
      <a>
        <Button full>Go to login page</Button>
      </a>
    </Link>
  </FullCenterSection>
);

export { Unauthenticated };
