import { MouseEventHandler, useState } from 'react';

import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Alert } from '../../alert/Alert';
import { Button } from '../../button/Button';
import { useAsync } from '../../hooks/UseAsync';
import { FullCenterSection } from '../../layout/FullCenterSection';
import { ProviderInfo } from '../../types/Auth';
import { mapInviteMessage } from '../../utils/InviteMessageMap';

type IAuthenticatedProps = {
  userInfo: ProviderInfo;
};

type IJoinInfo = {
  displayName: string;
};

const Authenticated = (props: IAuthenticatedProps) => {
  const router = useRouter();
  const { data, error } = useSWR<IJoinInfo>(
    router.isReady
      ? `/team/${router.query.teamId}/join/${router.query.verificationCode}`
      : null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const joinTeamAsync = useAsync(async () => {
    try {
      await API.post(
        'backend',
        `/team/${router.query.teamId}/join/${router.query.verificationCode}`,
        {
          body: {
            email: props.userInfo.email,
          },
        }
      );
    } catch (err) {
      setErrorMsg(mapInviteMessage(err));
    }
  });

  const handleJoinTeam: MouseEventHandler = async (event) => {
    event.preventDefault();
    await joinTeamAsync.execute();
  };

  if (error) {
    return <FullCenterSection title="Incorrect invite link" />;
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
          <span className="font-semibold">{props.userInfo.email}</span>,{'\n'}
          you&apos;ve been invited to join{' '}
          <span className="font-semibold">{data.displayName}</span>.
        </div>
      }
    >
      {errorMsg && <Alert text={errorMsg} />}

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
