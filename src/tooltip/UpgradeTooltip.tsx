import { DisabledTooltip } from './DisabledTooltip';

type IUpgradeTooltipProps = {
  hideLabel?: boolean;
  children: JSX.Element;
};

const UpgradeTooltip = (props: IUpgradeTooltipProps) => (
  <DisabledTooltip
    label="You don't have permission to perform this action"
    hideLabel={props.hideLabel}
  >
    {props.children}
  </DisabledTooltip>
);

export { UpgradeTooltip };
