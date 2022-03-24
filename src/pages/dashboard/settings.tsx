import useSWR from 'swr';

import { getShell } from '../../layout/Shell';
import { ISettings } from '../../templates/team/BillingSettings';
import { TeamSettings } from '../../templates/team/TeamSettings';
import { NextPageWithLayout } from '../../utils/NextLayout';

const Settings: NextPageWithLayout = () => {
  const { data } = useSWR<ISettings>('/user/settings');

  if (!data) {
    return null;
  }

  return <TeamSettings settings={data} />;
};

Settings.getLayout = getShell('Settings');

export default Settings;
