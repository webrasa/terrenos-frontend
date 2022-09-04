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
  disabled: boolean;
};

const Tooltip = ({
  label,
  placement = 'bottom',
  children,
  disabled,
}: ITooltipProps) => {
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
      {disabled && open && (
        <div
          ref={floating}
          className="my-1 rounded bg-gray-600 py-1 px-2 text-sm font-medium text-white"
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
