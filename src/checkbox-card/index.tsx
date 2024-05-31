import { FormElementBox } from '@/form/FormElementBox';

export type ItemType = {
  id: number;
  name: string;
  value: string;
};

export type CheckboxCardProps = {
  id: string;
  title: string;
  items: ItemType[];
};

/**
 * CheckboxCard component that displays a swipeable image gallery and property details.
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.id - id
 * @param {string[]} props.title - Card title.
 * @param {string} props.items - Array of available checkboxes.
 */

const CheckboxCard = ({ id, title, items }: CheckboxCardProps) => {
  return (
    <div className="w-full md:w-1/2">
      <h3 className="font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 mt-4">
        {items.map((item) => (
          <FormElementBox htmlFor={item.id.toString()} text={item.name}>
            <input id={item.id.toString()} type="checkbox" />
          </FormElementBox>
        ))}
      </div>
    </div>
  );
};

export { CheckboxCard };
