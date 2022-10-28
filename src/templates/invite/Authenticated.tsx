import { API } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { FullCenterSection } from '@/layouts/FullCenterSection';
import type { UserProfile } from '@/types/Auth';
import { findTeamInd } from '@/utils/Auth';
import { mapInviteMessage } from '@/utils/InviteMessageMap';

type IJoinInfo = {
  displayName: string;
};

/**
 * Join team as member after receiving invitation by email.
 * Invitation process can only begin when the user is signed-in.
 * @component
 */
const Authenticated = () => {
  const router = useRouter();
  const { data, error } = useSWR<IJoinInfo>(
    router.isReady
      ? `/team/${router.query.teamId}/join/${router.query.verificationCode}`
      : null
  );
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);
  const { providerInfo, setCurrentTeamInd } = useAuth();

  const joinTeamAsync = useAsync(async () => {
    try {
      await API.post(
        'backend',
        `/team/${router.query.teamId}/join/${router.query.verificationCode}`,
        {
          body: {
            email: providerInfo.email,
          },
        }
      );

      const profile = await mutate<UserProfile>(
        `/user/profile?email=${encodeURIComponent(providerInfo.email)}`
      );
      const ind = findTeamInd(profile?.teamList, router.query.teamId);
      setCurrentTeamInd(ind);
      await router.push('/dashboard');
    } catch (err) {
      setFormGlobalError(mapInviteMessage(err));
    }
  });

  const handleJoinTeam: MouseEventHandler = async (event) => {
    event.preventDefault();
    await joinTeamAsync.execute();
  };

  if (error) {
    return (
      <FullCenterSection
        title="Join team"
        description={<div className="text-red-600">Incorrect invite link.</div>}
      >
        <Link href="/dashboard">
          <Button full>Go to dashboard</Button>
        </Link>
      </FullCenterSection>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <FullCenterSection
      title="Join team"
      description={
        <div className="whitespace-pre-line">
          Currently signed in as{' '}
          <span className="font-semibold">{providerInfo.email}</span>,{'\n'}
          you&apos;ve been invited to join{' '}
          <span className="font-semibold">{data.displayName}</span>.
        </div>
      }
    >
      {formGlobalError && <Alert text={formGlobalError} />}

      <button
        type="button"
        className="w-full"
        onClick={handleJoinTeam}
        disabled={joinTeamAsync.pending}
      >
        <Button full loading={joinTeamAsync.pending}>
          Accept invite
        </Button>
      </button>
    </FullCenterSection>
  );
};

export { Authenticated };
