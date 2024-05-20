import { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import type { DropdownItem } from '@/types/DropdownItem';

interface Props {
  getData: () => array;
  updateData: (
    id: string,
    status: string,
    properties: array,
    setProperties: () => void,
  ) => array;
}

const Drafts: React.FC<Props> = ({ getData, updateData }) => {
  const [properties, setProperties] = useState<any>();
  const [selectedDropdown, setSelectedDropdown] = useState('');

  const dropDownItems: DropdownItem[] = [
    { value: '', name: 'Change status' },
    { value: 'Active', name: 'Set as active' },
    { value: 'Sold', name: 'Set as sold' },
    { value: 'OffTheMarket', name: 'Set as off the market' },
    { value: 'Pending', name: 'Set as pending' },
  ];
  useEffect(() => {
    getData.execute(
      setProperties,
      (el: object) => el.property.status === 'Draft',
    );
  }, []);
  const changeStatus = (id: string, status: string) => {
    setSelectedDropdown(status);
    updateData.execute(id, status, properties, setProperties);
  };
  return (
    properties && (
      <div className="flex flex-wrap">
        {properties.map((item: object, index: number) => (
          <div key={index} className="w-full px-1 pt-6 sm:w-full md:w-1/3">
            <PropertyCard
              id={item.propertyId}
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
