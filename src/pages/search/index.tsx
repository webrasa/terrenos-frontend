import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import Filter from '@/filter/filter';
import AutoComplete from '@/header/search';
import { useAsync } from '@/hooks/UseAsync';
import { Meta } from '@/layouts/Meta';
import Map from '@/map';
import { useUserLocation } from '@/store/locationContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { Properties } from '@/types/IComponents';
import type { IHome } from '@/types/IHome';
import type { ISearchFilters } from '@/types/Search';
import { AppConfig } from '@/utils/AppConfig';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['search', 'common', 'index'])),
    },
  };
}

const Search = () => {
  const router = useRouter();

  // States
  const [data, setData] = useState<IHome>({});
  // const [attributesData, setAttributesData] = useState<Array<Attributes>>([]);
  const [homeData, setHomeData] = useState<IHome>({});
  const [filters, setFilters] = useState<ISearchFilters>({
    priceFrom: '',
    priceTo: '',
    surfaceFrom: '',
    surfaceTo: '',
    attributes: '',
    sortBy: '',
    countryId: '',
    regionId: '',
    cityId: '',
    districtId: '',
    userLocation: '',
  });

  // Translations
  const { t: translationSearch } = useTranslation('search');
  const { t: translationCommon } = useTranslation('common');
  const { t: translationIndex } = useTranslation('index');

  // Context
  const { ipLocation } = useUserLocation();

  // Functions
  const getData = useAsync(async () => {
    try {
      const { countryId, regionId, cityId, districtId, userLocation } =
        router.query;

      const searchData = await API.get(
        'backend',
        `/search?countryId=${filters.countryId || countryId}&regionId=${filters.regionId || regionId}&cityId=${filters.cityId || cityId}&districtId=${filters.districtId || districtId}&userLocation=${userLocation}&attributes=${filters.attributes}&priceFrom=${filters.priceFrom}&priceTo=${filters.priceTo}&surfaceFrom=${filters.surfaceFrom}&surfaceTo=${filters.surfaceTo}`,
        {},
      );
      setData(searchData);
    } catch (err: any) {
      // handle error
      console.log(err.message);
    }
  });

  const getHomeData = useAsync(async (latitude: string, longitude: string) => {
    try {
      if (Object.keys(data).length > 0 && ipLocation.source === 'IP') return;
      const hData = await API.get(
        'backend',
        `/home/${latitude}/${longitude}`,
        {},
      );
      setHomeData(hData);
    } catch (err: any) {
      // handle error
      console.log(err.message);
    }
  });

  // const getAttributes = useAsync(async () => {
  //   try {
  //     const attData = await API.get('backend', `/attributesByCategories`, {});
  //     setAttributesData(attData.attributesByCategories);
  //   } catch (err: any) {
  //     // handle error
  //     console.log(err.message);
  //   }
  // });

  const getPropertyLocation = (item: Properties) => {
    let address = '';
    if (item.country) address = item.country.name;
    if (item.region) address = `${address}, ${item.region.name}`;
    if (item.city) address = `${address}, ${item.city.name}`;
    if (item.district) address = `${address}, ${item.district.name}`;

    return address;
  };

  const sort = (selected: string) => {
    let sortedArrayOfProperties: Array<Properties> = [];

    switch (selected) {
      case 'newsetLabel':
        sortedArrayOfProperties =
          data.properties?.sort((a, b) => {
            const keyA = new Date(a.createdAt);
            const keyB = new Date(b.createdAt);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          }) || [];
        break;
      case 'priceHighToLowLabel':
        sortedArrayOfProperties =
          data.properties?.sort((a, b) => {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            return 0;
          }) || [];
        break;
      case 'priceLowToHighLabel':
        sortedArrayOfProperties =
          data.properties?.sort((a, b) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
          }) || [];
        break;
      case 'updatedRecentlyLabel':
        sortedArrayOfProperties =
          data.properties?.sort((a, b) => {
            const keyA = new Date(a.updatedAt);
            const keyB = new Date(b.updatedAt);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          }) || [];
        break;
      case 'trendingLabel':
        getData.execute();
        break;
      default:
        getData.execute();
        break;
    }

    if (sortedArrayOfProperties.length > 0)
      setData({ properties: sortedArrayOfProperties });
  };

  // Hooks
  useEffect(() => {
    const isEmpty = Object.values(router.query).every(
      (value) => value === null || value === '',
    );
    if (!isEmpty) getData.execute();
  }, [router.query]);

  useEffect(() => {
    getData.execute();
  }, [filters]);

  useEffect(() => {
    if (
      ipLocation.latitude &&
      ipLocation.latitude !== 0 &&
      ipLocation.longitude &&
      ipLocation.longitude !== 0
    ) {
      getHomeData.execute(ipLocation.latitude, ipLocation.longitude);
    }
  }, [ipLocation]);

  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={translationSearch('general.title')}
        description={translationSearch('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar translation={translationCommon} />
      <div className="mx-auto mt-3 max-w-screen-xl px-3 py-4">
        <div className="flex">
          <div className="w-1/2">
            <AutoComplete
              indexTranslations={translationIndex}
              data={homeData?.locations || []}
              url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${ipLocation.latitude},${ipLocation.longitude}`}
              skipDisableOnChange={true}
            />
          </div>
          <Filter
            getData={getData}
            attributesData={homeData.attributes || []}
            sort={sort}
            translations={translationSearch}
            translationCommon={translationCommon}
            setFilters={setFilters}
            filters={filters}
          />
        </div>
        <div className="mt-3 flex">
          <div className="h-auto w-1/2">
            <Map />
          </div>
          <div className="relative ml-5 w-3/4">
            <span className="text-3xl font-semibold text-black">Results</span>
            <div className="custom-scroll mt-2 grid max-h-screen grid-cols-2 gap-4">
              {data && data.properties && data.properties
                ? data.properties.map((item, index) => {
                    return (
                      <PropertyCard
                        key={index}
                        id={item.id.toString()}
                        price={item.price.toString()}
                        status={index % 3}
                        surfaceArea={1.6}
                        location={getPropertyLocation(item)}
                        secondLocation={item.address}
                        images={[
                          'https://picsum.photos/200/300',
                          'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                          'https://picsum.photos/200/300',
                        ]}
                      />
                    );
                  })
                : []}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
