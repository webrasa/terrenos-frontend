import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from '@headlessui/react';
import { API } from 'aws-amplify';
import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Fragment, useEffect, useRef, useState } from 'react';

import { useAsync } from '@/hooks/UseAsync';
import { useAuth, withAuth } from '@/hooks/UseAuth';
import { LandingSection } from '@/layouts/LandingSection';
import { Meta } from '@/layouts/Meta';
import { useWatchList } from '@/store/watchListContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { Properties, PropertyData } from '@/types/IComponents';
import { AppConfig } from '@/utils/AppConfig';

import Account from './Account';
import CurrentListing from './CurrentListing';
import Drafts from './Drafts';
import Inbox from './Inbox';
import SoldOffMarket from './SoldOffMarket';
import WatchList from './WatchList';

import { getStaticPaths, makeStaticProps } from '../../../utils/getStatic';


const getStaticProps = makeStaticProps(['common', 'profile']);
export { getStaticPaths, getStaticProps }

const Index = () => {
  const { profile, providerInfo } = useAuth();

  // NOTE: Testing
  console.log('Profile: ', profile);
  console.log('ProviderInfo: ', providerInfo);

  const { t } = useTranslation('common');
  const { t: translationProfile } = useTranslation('profile');
  const { setWatchList } = useWatchList();
  const [properties, setProperties] = useState<Array<PropertyData>>();
  const userName = 'Mary';
  const userProfileImage = 'https://picsum.photos/200/200';
  const userId = profile?.id;
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // FIX:  This is a temporary dev data

  const getData = useAsync(async () => {
    try {
      const propertiesData = await API.get(
        'backend',
        `/properties/${userId}`,
        {},
      );
      setProperties(propertiesData.properties);
    } catch (err: any) {
      // handle error
      console.log(err.message);
    }
  });

  const updateData = useAsync(async (id, status) => {
    try {
      const property: Properties =
        properties?.filter((el: PropertyData) => el.id === Number(id))[0]
          ?.property || ({} as Properties);

      property.attributes = property?.propertyAttributes?.map(
        (el: any) => el.id,
      );

      const myInit = {
        body: {
          ...property,
          status,
        },
      };
      await API.put('backend', `/updateProperty/${id}`, myInit);
      getData.execute();
    } catch (err: any) {
      // handle error
      console.log(err.message);
    }
  });

  useEffect(() => {
    const idsString = getCookie('likedProperties') || '';
    const ids = idsString ? idsString.split('-') : [];
    setWatchList(ids);
    getData.execute();
  }, []);

  const tabListRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabListRef.current) {
      tabListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  const handleTabChange = (index: number) => {
    if (index > selectedIndex) {
      setDirection('right');
    } else {
      setDirection('left');
    }
    setSelectedIndex(index);
  };

  const tabs = [
    {
      name: 'Current Listing',
      key: 'currentListing',
      component: (
        <CurrentListing
          properties={properties?.filter(
            (el) =>
              el.property.status === 'Active' ||
              el.property.status === 'Pending',
          )}
          updateData={updateData}
        />
      ),
    },
    {
      name: 'Drafts',
      key: 'drafts',
      component: (
        <Drafts
          properties={properties?.filter(
            (el) => el.property.status === 'Draft',
          )}
          updateData={updateData}
        />
      ),
    },
    {
      name: 'My Watch List',
      key: 'myWatchList',
      component: <WatchList properties={properties} />,
    },
    {
      name: 'Sold / Off the market',
      key: 'soldOffTheMarket',
      component: (
        <SoldOffMarket
          properties={properties?.filter(
            (el) =>
              el.property.status === 'Sold' ||
              el.property.status === 'OffTheMarket',
          )}
          updateData={updateData}
        />
      ),
    },
    { name: 'Inbox', key: 'inbox', component: <Inbox array={array} /> },
    { name: 'Account', key: 'account', component: <Account array={array} /> },
  ];

  return (
    <div className="antialiased">
      <Meta
        title={translationProfile('general.title')}
        description={translationProfile('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar translation={t} />
      <LandingSection yPadding="py-4">
        <div className="container mx-auto">
          <div className="relative flex items-center space-x-4">
            <img
              src={userProfileImage}
              alt="Profile"
              className="size-24 rounded-full object-cover"
            />
            <h1 className="text-3xl font-medium text-black">
              Hello, {userName}
            </h1>
            <div
              onClick={scrollLeft}
              className="absolute right-12 top-14 cursor-pointer rounded border border-gray-400 p-1 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div
              onClick={scrollRight}
              className="absolute right-2 top-14 cursor-pointer rounded border border-gray-400 p-1 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
            <TabList
              ref={tabListRef}
              className="h-15 hide-scrollbar -ml-8 flex flex-nowrap overflow-x-auto overflow-y-hidden whitespace-nowrap border-b-2 md:block"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  className={({ selected }) =>
                    `text-black outline-none h-12 py-2 mx-10 relative ${
                      selected ? 'font-bold border-green-600' : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      {tab.name}
                      <Transition
                        show={selected}
                        as={Fragment}
                        enter="transition ease-out duration-300"
                        enterFrom={
                          direction === 'right'
                            ? 'transform -translate-x-full opacity-0'
                            : 'transform translate-x-full opacity-0'
                        }
                        enterTo="transform translate-x-0 opacity-200"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform translate-x-0 opacity-200"
                        leaveTo={
                          direction === 'right'
                            ? 'transform translate-x-full opacity-0'
                            : 'transform -translate-x-full opacity-0'
                        }
                      >
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-green-600" />
                      </Transition>
                    </>
                  )}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {tabs.map((tab) => (
                <TabPanel key={tab.key}>{tab.component}</TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </LandingSection>
      <Footer />
    </div>
  );
};

export default withAuth(Index);
