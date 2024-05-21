import { PropertyCard } from '@/card/Card';

interface Props {
  array: number[];
}
PropertyCard;
const CurrentListing: React.FC<Props> = ({ array }) => (
  <div className="flex flex-wrap">
    {array.map((item, index) => (
      <div key={index} className="w-full sm:w-full md:w-1/3 px-1 pt-6">
        <PropertyCard
          id={index.toString()}
          price={55000}
          surfaceArea={1.6}
          fullWidth={true}
          location={'Alajuela provincia, Alajuela, Carrizal Costa'}
          secondLocation={'Rica, Alajuela provincia'}
          images={[
            'https://picsum.photos/200/300',
            'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
            'https://picsum.photos/200/300',
          ]}
          showDropdown={true}
          showEditButton={true}
          numberOfDays={10}
          numberOfViews={12}
          numberOfFavorites={2}
        />
      </div>
    ))}
  </div>
);

export default CurrentListing;
