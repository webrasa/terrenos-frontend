import { CheckboxCard, ItemType } from '@/checkbox-card';
import { useState } from 'react';

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
      <div className="flex flex-wrap flex-col md:flex-row justify-between gap-y-4">
        {itemsArray.slice(0, showAll ? itemsArray.length : 2).map((item) => (
          <CheckboxCard
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            items={item.items}
          />
        ))}
      </div>
      <div className="text-right w-full">
        <p onClick={toggleShowAll} className="cursor-pointer text-blue-500">
          {showAll ? 'Show less' : 'Show more'}
        </p>
      </div>
    </div>
  );
};

export { CheckboxWrap };
