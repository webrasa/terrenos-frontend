import { useState } from 'react';

import type { ItemType } from '@/checkbox-card';
import { CheckboxCard } from '@/checkbox-card';

type CheckboxType = {
  id: number;
  title: string;
  items: ItemType[];
};

type CheckboxWrapProps = {
  itemsArray: CheckboxType[];
};

/**
 * CheckboxWrap component that displays a swipeable image gallery and property details.
 * @component
 * @param {Object} props - Component props.
 * @param {CheckboxType[]} itemsArray - Array of checkboxes
 */

const CheckboxWrap = ({ itemsArray }: CheckboxWrapProps) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap justify-between gap-y-4 md:flex-row">
        {itemsArray.slice(0, showAll ? itemsArray.length : 2).map((item) => (
          <CheckboxCard
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            items={item.items}
          />
        ))}
      </div>
      <div className="w-full text-right">
        <p onClick={toggleShowAll} className="cursor-pointer text-blue-500">
          {showAll ? 'Show less' : 'Show more'}
        </p>
      </div>
    </div>
  );
};

export { CheckboxWrap };
