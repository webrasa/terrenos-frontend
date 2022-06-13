import { useState } from 'react';

import { Button } from '@/button/Button';
import { useAuth } from '@/hooks/UseAuth';
import { CardSection } from '@/layout/CardSection';
import { SettingLine } from '@/settings/SettingLine';
import { TeamSettingsState } from '@/types/TeamSettingsState';

import type { IBillingSettingsProps } from './BillingSettings';
import { BillingSettings } from './BillingSettings';
import { ChangeTeamDisplayName } from './ChangeTeamDisplayName';
import { DeleteTeamDialog } from './DeleteTeamDialog';

const TeamSettings = (props: IBillingSettingsProps) => {
  const { currentTeam } = useAuth();
  const [dialogState, setDialogState] = useState<TeamSettingsState>(
    TeamSettingsState.NONE
  );

  const handleDialogState = (state: TeamSettingsState) => {
    setDialogState(state);
  };

  const handleCloseDialog = () => {
    setDialogState(TeamSettingsState.NONE);
  };

  return (
    <>
      <CardSection title="General">
        <SettingLine
          name="Display name"
          description={currentTeam.displayName}
          action={
            <button
              type="button"
              onClick={() =>
                handleDialogState(TeamSettingsState.CHANGE_DISPLAY_NAME)
              }
            >
              <Button sm>Change</Button>
            </button>
          }
        />
      </CardSection>
      <BillingSettings settings={props.settings} />
      <CardSection title="Danger Zone">
        <SettingLine
          name="Delete team"
          description="Permanently delete team and all its data."
          action={
            <button
              type="button"
              onClick={() => handleDialogState(TeamSettingsState.DELETE_TEAM)}
            >
              <Button sm red>
                Delete
              </Button>
            </button>
          }
        />
      </CardSection>

      <ChangeTeamDisplayName
        show={dialogState === TeamSettingsState.CHANGE_DISPLAY_NAME}
        handleCloseDialog={handleCloseDialog}
      />
      <DeleteTeamDialog
        show={dialogState === TeamSettingsState.DELETE_TEAM}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { TeamSettings };
