import { getShell } from '../../layout/Shell';
import { UserInfoSettings } from '../../templates/settings/UserInfoSettings';
import { NextPageWithLayout } from '../../utils/NextLayout';

const Account: NextPageWithLayout = () => <UserInfoSettings />;

Account.getLayout = getShell('Account');

export default Account;
