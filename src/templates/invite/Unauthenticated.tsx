import Link from 'next/link';

import { Button } from '@/button/Button';
import { FullCenterSection } from '@/layout/FullCenterSection';
import { AppConfig } from '@/utils/AppConfig';

/**
 * Message shown in the invite process when the user isn't signed-in.
 * @component
 */
const Unauthenticated = () => (
  <FullCenterSection
    title="Join team"
    description={`You've been invited to join a team on ${AppConfig.site_name}.`}
  >
    <Link href="/login">
      <a>
        <Button full>Create an account or login to join</Button>
      </a>
    </Link>
  </FullCenterSection>
);

export { Unauthenticated };
