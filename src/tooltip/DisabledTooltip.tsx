import type { Placement } from '@floating-ui/react-dom';
import { cloneElement } from 'react';

import { Tooltip } from './Tooltip';

type IUpgradeTooltipProps = {
  label: string;
  hideLabel?: boolean;
  children: JSX.Element;
  placement?: Placement;
};

const DisabledTooltip = (props: IUpgradeTooltipProps) => (
  <Tooltip
    hideLabel={props.hideLabel}
    label={props.label}
    placement={props.placement}
  >
    {cloneElement(props.children, {
      disabled: !props.hideLabel,
      ...props.children.props,
    })}
  </Tooltip>
);

export { DisabledTooltip };
