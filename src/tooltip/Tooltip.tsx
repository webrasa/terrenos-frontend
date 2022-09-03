import type { Placement } from '@floating-ui/react-dom';
import { flip } from '@floating-ui/react-dom';
import {
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { useState } from 'react';

type ITooltipProps = {
  label: string;
  placement?: Placement;
  children: JSX.Element;
};

const Tooltip = ({ label, placement = 'bottom', children }: ITooltipProps) => {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [flip()],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  return (
    <>
      <span ref={reference} {...getReferenceProps()}>
        {children}
      </span>
      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
        >
          {label}
        </div>
      )}
    </>
  );
};

export { Tooltip };
