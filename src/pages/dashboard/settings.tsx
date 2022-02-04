import useSWR from 'swr';

import { getShell } from '../../layout/Shell';
import { ISettings, AccountSettings } from '../../templates/AccountSettings';
import { NextPageWithLayout } from '../../utils/NextLayout';

const Settings: NextPageWithLayout = () => {
  const { data } = useSWR<ISettings>('/user/settings');

  if (!data) {
    return null;
  }

  return <AccountSettings settings={data} />;
};

Settings.getLayout = getShell('Settings');

export default Settings;
