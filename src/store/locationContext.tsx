import { getCookie, setCookie } from 'cookies-next';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Location } from '@/types/Location';

const UserLocationContext = createContext({});

export function UserLocationProvider(props: any) {
  const [ipLocation, setIpLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    source: '',
  });

  const getUserLocationFromIp = () => {
    return fetch(`https://ipapi.co/json/`, {
      cache: 'no-store',
    })
      .then(async (res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
  };

  const fetchAPI = async () => {
    const res = await getUserLocationFromIp();
    if (!getCookie('currency')) setCookie('currency', res.currency);
    if (!getCookie('language'))
      setCookie('language', res.languages.split(',')[0].trim());

    if (
      !ipLocation.latitude ||
      !ipLocation.longitude ||
      ipLocation.latitude === 0 ||
      ipLocation.longitude === 0
    )
      setIpLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        source: 'IP',
      });
  };

  const getUserLocation = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;

        setIpLocation({ latitude, longitude, source: 'GEO' });
      });
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchAPI();
  }, []);

  const data = useMemo(() => {
    return {
      ipLocation,
      setIpLocation,
    };
  }, [ipLocation]);

  return <UserLocationContext.Provider value={data} {...props} />;
}

export function useUserLocation() {
  const context = useContext<any>(UserLocationContext);
  return context;
}
