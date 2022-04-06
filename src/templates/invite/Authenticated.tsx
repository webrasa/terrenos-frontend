import { Button } from '../../button/Button';
import { FullCenterSection } from '../../layout/FullCenterSection';
import { ProviderInfo } from '../../types/Auth';

type IAuthenticatedProps = {
  userInfo: ProviderInfo;
};

const Authenticated = (props: IAuthenticatedProps) => (
  <FullCenterSection
    title="Join team"
    description={
      <div className="whitespace-pre-line">
        Currently signed in as{' '}
        <span className="font-semibold">{props.userInfo.email}</span>,{'\n'}
        you&apos;ve been invited to join{' '}
        <span className="font-semibold">Team name</span>.
      </div>
    }
  >
    <Button full>Accept invite</Button>
  </FullCenterSection>
);

export { Authenticated };
