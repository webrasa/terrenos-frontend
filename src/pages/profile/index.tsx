import { useTranslation } from 'next-i18next';
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from '@headlessui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer';
import { Fragment, useEffect, useRef, useState } from 'react';
import { getCookie } from 'cookies-next';
import { LandingSection } from '@/layouts/LandingSection';
import CurrentListing from './CurrentListing';
import Drafts from './Drafts';
import WatchList from './WatchList';
import SoldOffMarket from './SoldOffMarket';
import Inbox from './Inbox';
import Account from './Account';

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
    {
      name: 'Current Listing',
      key: 'currentListing',
      component: <CurrentListing array={array} />,
    },
    { name: 'Drafts', key: 'drafts', component: <Drafts array={array} /> },
    {
      name: 'My Watch List',
      key: 'myWatchList',
      component: <WatchList array={array} likedIds={likedIds} />,
    },
    {
      name: 'Sold / Off the market',
      key: 'soldOffTheMarket',
      component: <SoldOffMarket array={array} />,
    },
    { name: 'Inbox', key: 'inbox', component: <Inbox array={array} /> },
    { name: 'Account', key: 'account', component: <Account array={array} /> },
  ];

  useEffect(() => {
    const idsString = getCookie('likedProperties') || '';
    const ids = idsString ? idsString.split('-') : [];
    setLikedIds(ids);
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

  return (
    <div className="antialiased">
      <Navbar />
      <LandingSection yPadding="py-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4 relative">
            <img
              src={userProfileImage}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
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
              className="border-b-2 h-15 -ml-8 flex flex-nowrap overflow-x-auto overflow-y-hidden md:block whitespace-nowrap hide-scrollbar"
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
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600" />
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

// Index.getLayout = getShell({
//   title: 'Profile',
//   description: 'This is profile description',
//   image: 'imageURL',
// });

export default Index;
