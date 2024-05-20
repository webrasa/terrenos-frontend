import React, { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import { useWatchList } from '@/store/watchListContext';

interface Props {
  array: number[];
}

const WatchList: React.FC<Props> = ({ getData }) => {
  const { watchList } = useWatchList();
  const [properties, setProperties] = useState<object>();

  useEffect(() => {
    getData.execute(setProperties, (el: object) =>
      watchList.includes(el.property.id.toString()),
    );
  }, []);

  return (
    <div className="flex flex-wrap">
      {properties?.map((item, index) => {
        if (watchList.includes(item.id.toString())) {
          return (
            <div key={index} className="w-full px-1 pt-6 sm:w-full md:w-1/3">
              <PropertyCard
                id={item.id.toString()}
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
                status={item.property.status}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default WatchList;
