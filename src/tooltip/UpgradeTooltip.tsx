import { cloneElement } from 'react';

import { Tooltip } from './Tooltip';

type IUpgradeTooltipProps = {
  hideLabel: boolean;
  children: JSX.Element;
};

const UpgradeTooltip = (props: IUpgradeTooltipProps) => (
  <Tooltip
    hideLabel={props.hideLabel}
    label="You don't have permission to perform this action"
  >
    {cloneElement(props.children, {
      disabled: !props.hideLabel,
      ...props.children.props,
    })}
  </Tooltip>
);

export { UpgradeTooltip };
