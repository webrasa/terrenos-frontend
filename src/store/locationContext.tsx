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

  useEffect(() => {
    async function fetchAPI() {
      const res = await getUserLocationFromIp();
      if (!getCookie('currency')) setCookie('currency', res.currency);
      if (!getCookie('language'))
        setCookie('language', res.languages.split(',')[0].trim());

      setIpLocation({
        latitude: res.latitude,
        longitude: res.longitude,
      });
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;

          setIpLocation({ latitude, longitude });
        });
      }
    };

    getUserLocation();
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
