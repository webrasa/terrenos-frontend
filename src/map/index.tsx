import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

import type { IMarker } from '@/types/IMarker';

const customStiles = {
  mapContainerStyle: {
    width: '100%',
    height: '100%',
  },
};

type IMapsProps = {
  children?: JSX.Element;
  onClickHandler?: any;
  markers?: Array<IMarker>;
  showMarkers?: boolean;
  center: IMarker;
};

function Map(props: IMapsProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  });
  let center;
  if (isLoaded) {
    center = new google.maps.LatLng(
      props.center?.latitude,
      props.center?.longitude,
    );
  }

  const [map, setMap] = useState(null);

  const handleOnLoad = (gMap: any) => {
    const bounds = new google.maps.LatLngBounds();
    if (props.markers) {
      props.markers.forEach(({ latitude, longitude }) =>
        bounds.extend({
          lat: latitude,
          lng: longitude,
        }),
      );
    }
    gMap.fitBounds(bounds);
    setMap(gMap);
  };

  useEffect(() => {
    if (props.markers && props.markers.length > 0 && map) {
      handleOnLoad(map);
    }
  }, [props.markers]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={customStiles.mapContainerStyle}
      onLoad={isLoaded ? handleOnLoad : undefined}
      onClick={props.onClickHandler}
      onUnmount={onUnmount}
      center={center}
      mapTypeId={google.maps.MapTypeId.SATELLITE}
      options={{
        styles: [
          {
            elementType: 'labels',
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }}
    >
      {props.markers &&
        props.showMarkers &&
        props.markers.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: marker.latitude,
              lng: marker.longitude,
            }}
          ></Marker>
        ))}
      {props.children}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
