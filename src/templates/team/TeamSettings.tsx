import { Button } from '../../button/Button';
import { useAuth } from '../../hooks/UseAuth';
import { CardSection } from '../../layout/CardSection';
import { SettingLine } from '../../settings/SettingLine';
import { BillingSettings, IBillingSettingsProps } from './BillingSettings';

const TeamSettings = (props: IBillingSettingsProps) => {
  const { currentTeam } = useAuth();

  return (
    <>
      <CardSection title="General">
        <SettingLine
          name="Display name"
          description={currentTeam.displayName}
          action={
            <button type="button">
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
    </>
  );
};

export { TeamSettings };
