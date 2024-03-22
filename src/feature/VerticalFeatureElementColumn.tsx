import type { ReactNode } from 'react';

type IVerticalFeatureElementColumnProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

/**
 * Component used within VerticalFeature explain a sub-feature.
 * Each sub-feature is placed horizontally.
 * @component
 */
const VerticalFeatureElementColumn = (
  props: IVerticalFeatureElementColumnProps,
) => (
  <div className="vertical-feature-element-column flex flex-col">
    <div className="flex items-center">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-400">
        {props.icon}
      </div>

      <div className="ml-4 text-xl font-medium text-gray-900">
        {props.title}
      </div>
    </div>

    <div className="mt-3 text-base leading-7">{props.children}</div>

    <style jsx>
      {`
        .vertical-feature-element-column :global(svg) {
          @apply text-white stroke-current w-8 h-8 stroke-2;
        }
      `}
    </style>
  </div>
);

export { VerticalFeatureElementColumn };
