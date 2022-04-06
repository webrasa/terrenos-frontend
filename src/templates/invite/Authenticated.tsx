import { Button } from '../../button/Button';
import { FullCenterSection } from '../../layout/FullCenterSection';
import { ProviderInfo } from '../../types/Auth';

type IAuthenticatedProps = {
  userInfo: ProviderInfo;
};

const Authenticated = (props: IAuthenticatedProps) => (
  <FullCenterSection
    title="Join team"
    description={`Log in ${props.userInfo.email}`}
  >
    <Button full>Accept invite</Button>
  </FullCenterSection>
);

export { Authenticated };
