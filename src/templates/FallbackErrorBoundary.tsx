import { useRouter } from 'next/router';

import { Button } from '@/button/Button';
import { FullCenterSection } from '@/layout/FullCenterSection';

const FallbackErrorBoundary = () => {
  const router = useRouter();

  const handleReloadPage = () => {
    router.reload();
  };

  return (
    <FullCenterSection
      title="An error occurred"
      description={
        <div className="text-red-600">
          You aren&apos;t a member of the team.
        </div>
      }
    >
      <button type="button" className="w-full" onClick={handleReloadPage}>
        <Button full>Reload the page and switch team</Button>
      </button>
    </FullCenterSection>
  );
};

export { FallbackErrorBoundary };
