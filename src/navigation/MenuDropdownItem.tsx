import type { CookieValueTypes } from 'cookies-next';
import type { ChangeEventHandler, ReactNode } from 'react';

type DropdownItem = {
  value: string;
  name: string;
};
type IMenuDropdownItemProps = {
  items: DropdownItem[];
  id: string;
  icon?: ReactNode;
  selected: CookieValueTypes;
  onChangeHandler?: ChangeEventHandler<HTMLSelectElement>;
};

const MenuDropdownItem = (props: IMenuDropdownItemProps) => {
  return (
    <div className={`flex items-center ${props?.icon ? 'pl-2' : null} `}>
      {props.icon ? (
        <div className="flex items-center">{props.icon}</div>
      ) : null}
      <select
        id={props.id}
        onChange={props.onChangeHandler}
        className="w-full border-none pl-2 text-black focus:ring-0"
      >
        {props.items.map((item) => (
          <option
            key={item.value}
            value={item.value}
            selected={props.selected === item.value}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { MenuDropdownItem };
