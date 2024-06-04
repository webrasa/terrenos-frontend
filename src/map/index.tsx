import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import type { Properties } from '@/types/IComponents';

const customStiles = {
  mapContainerStyle: {
    width: '100%',
    height: '100%',
  },
};

type IMapsProps = {
  properties: Array<Properties>;
  getPropertyLocation: Function;
};

const options = {
  imagePath:
    'https://web.archive.org/web/20230701011019/https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function Map(props: IMapsProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  });
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [map, setMap] = useState(null);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (gMap: any) => {
    const bounds = new google.maps.LatLngBounds();
    props.properties.forEach(({ latitude, longtitude }) =>
      bounds.extend({
        lat: latitude || 0,
        lng: longtitude || 0,
      }),
    );
    gMap.fitBounds(bounds);
    setMap(gMap);
  };

  useEffect(() => {
    if (props.properties && props.properties.length > 0) {
      handleOnLoad(map);
    }
  }, [props.properties]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={customStiles.mapContainerStyle}
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      onUnmount={onUnmount}
    >
      <MarkerClusterer options={options}>
        {(clusterer) =>
          props.properties ? (
            props.properties.map((property, index) => (
              <Marker
                key={index}
                onClick={() => handleActiveMarker(index)}
                position={{
                  lat: property.latitude || 0,
                  lng: property.longtitude || 0,
                }}
                label={{
                  text: `${property.price}`,
                  color: 'blue',
                  fontSize: '20px',
                  background: 'red',
                  padding: '10px',
                }}
                icon={'/rounded-rectangle-svgrepo-com.png'}
                clusterer={clusterer}
              >
                {activeMarker === index ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <PropertyCard
                      key={index}
                      id={property.id.toString()}
                      price={property.price.toString()}
                      status={index % 3}
                      surfaceArea={1.6}
                      location={props.getPropertyLocation(property)}
                      secondLocation={property.address}
                      images={[
                        'https://picsum.photos/200/300',
                        'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                        'https://picsum.photos/200/300',
                      ]}
                    />
                  </InfoWindow>
                ) : null}
              </Marker>
            ))
          ) : (
            <></>
          )
        }
      </MarkerClusterer>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
