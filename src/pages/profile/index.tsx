import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

import { LandingSection } from '@/layouts/LandingSection';
import { useWatchList } from '@/store/watchListContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

import CurrentListing from './CurrentListing';
import Drafts from './Drafts';
import SoldOffMarket from './SoldOffMarket';
import WatchList from './WatchList';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['search'])),
    },
  };
}

const Index = () => {
  const { t } = useTranslation('index');
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { setWatchList } = useWatchList();
  const userName = 'Mary';
  const userProfileImage = 'https://picsum.photos/200/200';
  const tabs = [
    { name: 'Current Listing', key: 'currentListing' },
    { name: 'Drafts', key: 'drafts' },
    { name: 'My Watch List', key: 'myWatchList' },
    { name: 'Sold / Off the market', key: 'soldOffTheMarket' },
    { name: 'Inbox', key: 'inbox' },
    { name: 'Account', key: 'account' },
  ];

  useEffect(() => {
    const idsString = getCookie('likedProperties') || '';
    const ids = idsString ? idsString.split('-') : [];
    setWatchList(ids);
  }, []);

  return (
    <div className="antialiased">
      <Navbar translation={t} />
      <LandingSection yPadding="py-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <img
              src={userProfileImage}
              alt="Profile"
              className="size-24 rounded-full object-cover"
            />
            <h1 className="text-3xl font-medium text-black">
              Hello, {userName}
            </h1>
          </div>
          <TabGroup>
            <TabList className="h-15 -ml-8 flex flex-nowrap overflow-x-auto	overflow-y-hidden whitespace-nowrap border-b-2 md:block">
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  className="mx-10 h-12 border-green-600 py-2 text-black outline-none data-[selected]:border-b-8 data-[selected]:font-bold"
                >
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <CurrentListing array={array} />
              </TabPanel>
              <TabPanel>
                <Drafts array={array} />
              </TabPanel>
              <TabPanel>
                <WatchList array={array} />
              </TabPanel>
              <TabPanel>
                <SoldOffMarket array={array} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </LandingSection>
      <Footer />
    </div>
  );
};

// Index.getLayout = getShell({
//   title: 'Profile',
//   description: 'This is profile description',
//   image: 'imageURL',
// });

export default Index;
