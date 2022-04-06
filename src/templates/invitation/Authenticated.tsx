import { ProviderInfo } from '../../types/Auth';

type IAuthenticatedProps = {
  userInfo: ProviderInfo;
};

const Authenticated = (props: IAuthenticatedProps) => (
  <div>{props.userInfo.email}</div>
);

export { Authenticated };
