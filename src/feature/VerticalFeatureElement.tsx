import type { ReactNode } from 'react';

type IVerticalFeatureElementProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

/**
 * Component used within VerticalFeature explain a sub-feature.
 * Each sub-feature is placed vertically.
 * @component
 */
const VerticalFeatureElement = (props: IVerticalFeatureElementProps) => (
  <div className="vertical-feature-element mt-8 flex">
    <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-400">
      {props.icon}
    </div>

    <div className="ml-4">
      <div className="text-xl font-medium text-gray-900">{props.title}</div>

      <div className="mt-1">{props.children}</div>
    </div>

    <style jsx>
      {`
        .vertical-feature-element :global(svg) {
          @apply text-white stroke-current w-8 h-8 stroke-2;
        }
      `}
    </style>
  </div>
);

export { VerticalFeatureElement };
