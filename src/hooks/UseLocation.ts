import { useEffect, useState } from 'react';

import type { Location } from '@/types/Location';

export const UseLocation = () => {
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const getUserLocation = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;

          setUserLocation({ latitude, longitude });
        });
      }
    };

    getUserLocation();
  }, []);

  return { userLocation };
};
