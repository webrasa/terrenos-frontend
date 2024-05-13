import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
  borderRadius: '6px',
  width: '650px',
  height: '1000px',
};
const center = {
  lat: -3.745,
  lng: -38.523,
};
const options = {
  gestureHandling: 'greedy',
  disableDefaultUI: true,
  clickableIcons: false,
};

export default function Map() {
  return (
    <div className="mt-3">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
