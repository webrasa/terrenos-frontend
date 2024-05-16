import { useTranslation } from 'next-i18next';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { LandingSection } from '@/layouts/LandingSection';
import CurrentListing from './CurrentListing';
import Drafts from './Drafts';
import WatchList from './WatchList';
import SoldOffMarket from './SoldOffMarket';

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
  const [likedIds, setLikedIds] = useState<string[]>([]);
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
    setLikedIds(ids);
  }, []);

  return (
    <div className="antialiased">
      <Navbar />
      <LandingSection yPadding="py-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <img
              src={userProfileImage}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
            <h1 className="text-3xl font-medium text-black">
              Hello, {userName}
            </h1>
          </div>
          <TabGroup>
            <TabList className="border-b-2 h-15 -ml-8 flex flex-nowrap	overflow-x-auto overflow-y-hidden md:block whitespace-nowrap">
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  className="text-black data-[selected]:font-bold outline-none data-[selected]:border-b-8 border-green-600 h-12 py-2 mx-10"
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
                <WatchList array={array} likedIds={likedIds} />
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
