import { useState } from 'react';

import { Button } from '../../button/Button';
import { useAuth } from '../../hooks/UseAuth';
import { CardSection } from '../../layout/CardSection';
import { SettingLine } from '../../settings/SettingLine';
import { TeamSettingsState } from '../../types/TeamSettingsState';
import { BillingSettings, IBillingSettingsProps } from './BillingSettings';
import { ChangeTeamDisplayName } from './ChangeTeamDisplayName';

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
          action={
            <button type="button">
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
    </>
  );
};

export { TeamSettings };
