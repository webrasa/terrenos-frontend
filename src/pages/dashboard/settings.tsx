import useSWR from 'swr';

import { useAuth } from '@/hooks/UseAuth';
import { getShell } from '@/layout/Shell';
import type { ISettings } from '@/templates/team/BillingSettings';
import { TeamSettings } from '@/templates/team/TeamSettings';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const Settings: NextPageWithLayout = () => {
  const { currentTeam } = useAuth();
  const { data } = useSWR<ISettings>(`/team/${currentTeam.id}/settings`);

  if (!data) {
    return null;
  }

  return <TeamSettings settings={data} />;
};

Settings.getLayout = getShell('Settings');

export default Settings;
