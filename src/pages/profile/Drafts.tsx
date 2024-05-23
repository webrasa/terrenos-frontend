import { useState } from 'react';

import { PropertyCard } from '@/card/Card';
import type { DropdownItem } from '@/types/DropdownItem';
import type { PropertyData } from '@/types/IComponents';

type UpdateData = {
  execute: (...args: any[]) => Promise<false | void>;
  pending: boolean;
  value: void | null;
};

type Props = {
  properties: Array<PropertyData> | undefined;
  updateData: UpdateData;
};

const Drafts: React.FC<Props> = ({ properties, updateData }) => {
  const [selectedDropdown, setSelectedDropdown] = useState('');

  const dropDownItems: DropdownItem[] = [
    { value: '', name: 'Change status' },
    { value: 'Active', name: 'Set as active' },
    { value: 'Sold', name: 'Set as sold' },
    { value: 'OffTheMarket', name: 'Set as off the market' },
    { value: 'Pending', name: 'Set as pending' },
  ];
  const changeStatus = (id: string, status: string) => {
    setSelectedDropdown(status);
    updateData.execute(id, status);
  };

  return (
    properties && (
      <div className="flex flex-wrap">
        {properties.map((item: PropertyData, index: number) => (
          <div key={index} className="w-full px-1 pt-6 sm:w-full md:w-1/3">
            <PropertyCard
              id={item.propertyId.toString()}
              price={item.property.price}
              surfaceArea={item.property.surface}
              fullWidth={true}
              location={item.property.address}
              secondLocation={'Rica, Alajuela provincia'}
              images={[
                'https://picsum.photos/200/300',
                'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                'https://picsum.photos/200/300',
              ]}
              showDropdown={true}
              showEditButton={true}
              numberOfDays={10}
              numberOfViews={item.property.views}
              numberOfFavorites={item.property.saves}
              dropDownItems={dropDownItems}
              selectedDropdown={selectedDropdown}
              changeStatus={changeStatus}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default Drafts;
