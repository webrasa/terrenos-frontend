import Link from 'next/link';

import { Button } from '@/button/Button';
import { FullCenterSection } from '@/layout/FullCenterSection';

const Unauthenticated = () => (
  <FullCenterSection
    title="Join team"
    description={
      <div className="text-red-600">Only logged-in user can accept invite.</div>
    }
  >
    <Link href="/login">
      <a>
        <Button full>Go to login page</Button>
      </a>
    </Link>
  </FullCenterSection>
);

export { Unauthenticated };
