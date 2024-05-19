import React from 'react';

import { PropertyCard } from '@/card/Card';
import { useWatchList } from '@/store/watchListContext';

interface Props {
  array: number[];
}

const WatchList: React.FC<Props> = ({ array }) => {
  const { watchList } = useWatchList();

  return (
    <div className="flex flex-wrap">
      {array.map((item, index) => {
        if (watchList.includes(index.toString())) {
          return (
            <div key={index} className="w-full px-1 pt-6 sm:w-full md:w-1/3">
              <PropertyCard
                id={index.toString()}
                price={'$55,000'}
                surfaceArea={1.6}
                fullWidth={true}
                location={'Alajuela provincia, Alajuela, Carrizal Costa'}
                secondLocation={'Rica, Alajuela provincia'}
                images={[
                  'https://picsum.photos/200/300',
                  'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                  'https://picsum.photos/200/300',
                ]}
                status={index % 3}
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
