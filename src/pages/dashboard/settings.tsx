import useSWR from 'swr';

import { getShell } from '../../layout/Shell';
import { ISettings, Subscription } from '../../templates/Subscription';
import { NextPageWithLayout } from '../../utils/NextLayout';

const Settings: NextPageWithLayout = () => {
  const { data } = useSWR<ISettings>('/user/settings');

  if (!data) {
    return null;
  }

  return <Subscription settings={data} />;
};

Settings.getLayout = getShell('Settings');

export default Settings;
