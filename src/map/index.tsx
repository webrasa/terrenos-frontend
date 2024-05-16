import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
  borderRadius: '6px',
  width: '100%',
  height: '80dvh',
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
      <LoadScript googleMapsApiKey="AIzaSyC2LgbiWpTkch7IuCs-x1-toJw2XrKQZVI">
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
