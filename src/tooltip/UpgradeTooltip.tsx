import { cloneElement } from 'react';

import { Tooltip } from './Tooltip';

type IUpgradeTooltipProps = {
  disabled: boolean;
  children: JSX.Element;
};

const UpgradeTooltip = (props: IUpgradeTooltipProps) => (
  <Tooltip
    disabled={props.disabled}
    label="You don't have permission to perform this action"
  >
    {cloneElement(props.children, {
      disabled: props.disabled,
      ...props.children.props,
    })}
  </Tooltip>
);

export { UpgradeTooltip };
