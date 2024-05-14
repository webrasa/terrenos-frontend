import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { LandingSection } from '@/layouts/LandingSection';

type ScrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type ISliderProps = {
  children: JSX.Element[];
  translation: Function;
};

export default function CardSlider(props: ISliderProps) {
  const onWheel = (
    apiObj: ScrollVisibilityApiType,
    ev: React.WheelEvent,
  ): void => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  };

  const LeftArrow = () => {
    const visibility = React.useContext(VisibilityContext);

    return (
      <div
        onClick={() => visibility.scrollPrev()}
        className="absolute right-16 top-0 cursor-pointer rounded border border-gray-400 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#000"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  };

  const RightArrow = () => {
    const visibility = React.useContext(VisibilityContext);

    return (
      <div
        onClick={() => visibility.scrollNext()}
        className="absolute right-6 top-0 cursor-pointer rounded border border-gray-400 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#000"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  };

  return (
    <LandingSection yPadding="py-4">
      <div className="relative">
        <div className="mb-4 text-2xl font-bold text-black">
          <h1>{props.translation('cardSlider.locationsNearYou')}</h1>
        </div>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          scrollContainerClassName={'gap-4 hide-scrollbar'}
          onWheel={onWheel}
        >
          {props.children}
        </ScrollMenu>
      </div>
    </LandingSection>
  );
}
