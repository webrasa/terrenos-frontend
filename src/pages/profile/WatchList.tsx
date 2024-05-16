import { PropertyCard } from '@/card/Card';

interface Props {
  array: number[];
  likedIds: string[];
}

const WatchList: React.FC<Props> = ({ array, likedIds }) => (
  <div className="flex flex-wrap">
    {array.map((item, index) => {
      if (likedIds.includes(index.toString())) {
        return (
          <div key={index} className="w-full sm:w-full md:w-1/3 px-1 pt-6">
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
    })}
  </div>
);

export default WatchList;
