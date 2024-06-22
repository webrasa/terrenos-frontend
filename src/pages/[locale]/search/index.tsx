import { InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api';
import { API } from 'aws-amplify';
import router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import Filter from '@/filter/filter';
import AutoComplete from '@/header/search';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { Meta } from '@/layouts/Meta';
import Map from '@/map';
import { Pill } from '@/pill/Pill';
import { useUserLocation } from '@/store/locationContext';
import { Navbar } from '@/templates/Navbar';
import type { Attributes, Properties } from '@/types/IComponents';
import type { IHome } from '@/types/IHome';
import type { ISearchFilters } from '@/types/Search';
import { AppConfig } from '@/utils/AppConfig';

import { getStaticPaths, makeStaticProps } from '../../../utils/getStatic';


const getStaticProps = makeStaticProps(['search', 'common', 'index']);
export { getStaticPaths, getStaticProps }

const Search = () => {
  const { query, isReady } = useRouter();
  const { profile, providerInfo } = useAuth();

  // NOTE: Testing
  console.log('Profile: ', profile);
  console.log('ProviderInfo: ', providerInfo);

  // States
  const [data, setData] = useState<IHome>({});
  const [homeData, setHomeData] = useState<IHome>({});
  const [attributeData, setAttributeData] = useState<Array<Attributes>>([]);
  const [filters, setFilters] = useState<ISearchFilters>({
    countryId: '',
    regionId: '',
    cityId: '',
    districtId: '',
    userLocation: '',
    attributes: '',
    priceFrom: '',
    priceTo: '',
    surfaceFrom: '',
    surfaceTo: '',
    sortBy: '',
  });
  const [priceMaxValue, setPriceMaxValue] = useState<number>(1000000);
  const [surfaceMaxValue, setSurfaceMaxValue] = useState<number>(1000000);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  // Translations
  const { t: translationSearch } = useTranslation('search');
  const { t: translationCommon } = useTranslation('common');
  const { t: translationIndex } = useTranslation('index');

  // Context
  const { ipLocation } = useUserLocation();

  // Functions

  const handleActiveMarker = (marker: number) => {
    console.log(marker, activeMarker);
    if (marker === activeMarker) {
      return;
    }
    console.log('HI');
    setActiveMarker(marker);
  };
  const getData = useAsync(async () => {
    try {
      const searchData = await API.get(
        'backend',
        `/search?countryId=${filters.countryId}&regionId=${filters.regionId}&cityId=${filters.cityId}&districtId=${filters.districtId}&userLocation=${filters.userLocation}&attributes=${filters.attributes}&priceFrom=${filters.priceFrom}&priceTo=${filters.priceTo}&surfaceFrom=${filters.surfaceFrom}&surfaceTo=${filters.surfaceTo}`,
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

  const getAttributeData = useAsync(async () => {
    try {
      const aData = await API.get('backend', `/attributesByCategories`, {});
      setAttributeData(aData.attributesByCategories);
    } catch (err: any) {
      // handle error
      console.log(err.message);
    }
  });

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

  const pillOnClickHandler = (id: string) => {
    const filterAttributesArray =
      filters.attributes && typeof filters.attributes === 'string'
        ? filters.attributes?.split(',')
        : [];
    const newFilterAttributesArray = filterAttributesArray.filter(
      (el: string) => el !== id,
    );
    setFilters({
      ...filters,
      attributes: newFilterAttributesArray.toString(),
    });
  };

  // Hooks
  useEffect(() => {
    if (!isReady) return;
    const isEmpty = Object.values(query).every(
      (value) => value === null || value === '',
    );
    if (!isEmpty) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { sortBy, ...rest } = filters;
      if (JSON.stringify(rest) !== JSON.stringify(query))
        setFilters({ ...filters, ...query });
    } else if (
      'countryId' in query &&
      'regionId' in query &&
      'cityId' in query &&
      'districtId' in query &&
      'userLocation' in query
    ) {
      getData.execute();
    }
  }, [query]);

  useEffect(() => {
    if (!isReady) return;

    // eslint-disable-next-line unused-imports/no-unused-vars
    const { sortBy, ...rest } = filters;

    if (
      !Object.values(query).every((value) => value === null || value === '') ||
      !Object.values(filters).every((value) => value === null || value === '')
    ) {
      router.push(
        {
          pathname: '/search',
          query: rest,
        },
        undefined,
        { shallow: true },
      );
    }
    getData.execute();
  }, [filters]);

  useEffect(() => {
    getAttributeData.execute();
  }, []);

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

  // THIS NEEDS TO BE TALKED THRU
  // useEffect(() => {
  //   if (data.properties && data.properties.length > 0) {
  //     const price = Math.max(...data.properties.map((o) => o.price));
  //     setPriceMaxValue(price);
  //     const surface = Math.max(...data.properties.map((o) => o.surface));
  //     setSurfaceMaxValue(surface);
  //   }
  // }, [data.properties]);

  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={translationSearch('general.title')}
        description={translationSearch('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar translation={translationCommon} />
      <div className="">
        <div className="flex">
          <div className="custom-map w-1/2">
            <Map
              center={{
                latitude: ipLocation.latitude,
                longitude: ipLocation.longitude,
              }}
              showMarkers={false}
              markers={data.properties?.map((property) => ({
                longitude: property.longtitude,
                latitude: property.latitude,
              }))}
              onClickHandler={() => setActiveMarker(null)}
            >
              {data.properties && data.properties.length > 0 ? (
                <MarkerClusterer
                  options={{
                    imagePath:
                      'https://web.archive.org/web/20230701011019/https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
                  }}
                >
                  {(clusterer) => (
                    <div>
                      {data.properties
                        ? data.properties.map((property, index) => (
                            <Marker
                              key={index}
                              onClick={() => handleActiveMarker(property.id)}
                              position={{
                                lat: property.latitude,
                                lng: property.longtitude,
                              }}
                              label={{
                                text: `${property.price}`,
                                color: 'black',
                                fontSize: '16px',
                              }}
                              icon={'/map-marker-64x64.png'}
                              clusterer={clusterer}
                            >
                              {activeMarker === property.id ? (
                                <InfoWindow
                                  onCloseClick={() => setActiveMarker(null)}
                                >
                                  <PropertyCard
                                    key={index}
                                    id={property.id.toString()}
                                    price={property.price.toString()}
                                    status={property.status}
                                    surfaceArea={property.surface}
                                    location={getPropertyLocation(property)}
                                    secondLocation={property.address}
                                    images={property.medias.map(
                                      (image) => image.url,
                                    )}
                                  />
                                </InfoWindow>
                              ) : null}
                            </Marker>
                          ))
                        : null}
                    </div>
                  )}
                </MarkerClusterer>
              ) : (
                <></>
              )}
            </Map>
          </div>
          <div className="custom-scroll mx-2 mt-5 w-1/2 px-2">
            <AutoComplete
              indexTranslations={translationIndex}
              data={homeData?.locations || []}
              url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${ipLocation.latitude},${ipLocation.longitude}`}
              filters={filters}
              setFilters={setFilters}
              userLocation={`${ipLocation.latitude},${ipLocation.longitude}`}
            />
            <div className="mt-2">
              <Filter
                attributesData={attributeData || []}
                sort={sort}
                translations={translationSearch}
                translationCommon={translationCommon}
                setFilters={setFilters}
                filters={filters}
                maxPrice={priceMaxValue}
                maxSurface={surfaceMaxValue}
              />
            </div>
            <div className="mt-2 flex max-h-screen flex-wrap gap-4">
              {filters.attributes && typeof filters.attributes === 'string'
                ? filters.attributes?.split(',').map((id, key) => {
                    const att = attributeData.find(
                      (attribute) => attribute.id === Number(id),
                    );
                    return (
                      <Pill
                        key={key}
                        base
                        greenBorder
                        name={translationCommon(
                          `attributes.${att?.name || ''}`,
                        )}
                        onClickHandler={() => pillOnClickHandler(id)}
                      ></Pill>
                    );
                  })
                : ''}
            </div>
            <div className="">
              <span className="text-3xl font-semibold text-black">Results</span>
            </div>
            <div className="mt-2 grid max-h-screen grid-cols-2 gap-4">
              {data && data.properties && data.properties
                ? data.properties.map((item, index) => {
                    return (
                      <PropertyCard
                        key={index}
                        id={item.id.toString()}
                        price={item.price.toString()}
                        status={item.status}
                        surfaceArea={item.surface}
                        location={getPropertyLocation(item)}
                        secondLocation={item.address}
                        images={item.medias.map((image) => image.url)}
                      />
                    );
                  })
                : []}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
