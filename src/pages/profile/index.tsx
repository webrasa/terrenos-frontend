import { useTranslation } from 'next-i18next';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Navbar } from '@/templates/Navbar';
import { Footer } from '@/templates/Footer';
import { PropertyCard } from '@/card/Card';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

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
    <div className='antialiased'>
      <Navbar />
      <div className='container mx-auto md:px-40 px-4'>
        <div className='flex items-center space-x-4 py-4'>
          <img
            src={userProfileImage}
            alt='Profile'
            className='h-24 w-24 rounded-full object-cover'
          />
          <h1 className='text-3xl font-medium text-black'>Hello, {userName}</h1>
        </div>
        <TabGroup>
          <TabList className='border-b-2 h-15 -ml-12 flex flex-nowrap	overflow-x-auto overflow-y-hidden md:block whitespace-nowrap'>
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                className='text-black data-[selected]:font-bold outline-none data-[selected]:border-b-8 border-green-600 h-12 py-2 mx-10'
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className='flex flex-wrap mx-2'>
                {array.map((item, index) => {
                  return (
                    <div className={`w-full sm:w-full md:w-1/3 px-1 pt-6`}>
                      <PropertyCard
                        key={index}
                        id={index.toString()}
                        price={'$55,000'}
                        sizeMeters={1.6}
                        fullWidth={true}
                        location={
                          'Alajuela provincia, Alajuela, Carrizal Costa'
                        }
                        secondLocation={'Rica, Alajuela provincia'}
                        images={[
                          'https://picsum.photos/200/300',
                          'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                          'https://picsum.photos/200/300',
                        ]}
                        showDropdown={true}
                        showEditButton={true}
                        numberOfDays={10}
                        numberOfViews={12}
                        numberOfFavorites={2}
                      />
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap mx-2'>
                {array.map((item, index) => {
                  return (
                    <div className={`w-full sm:w-full md:w-1/3 px-1 pt-6`}>
                      <PropertyCard
                        key={index}
                        id={index.toString()}
                        price={'$55,000'}
                        sizeMeters={1.6}
                        fullWidth={true}
                        location={
                          'Alajuela provincia, Alajuela, Carrizal Costa'
                        }
                        secondLocation={'Rica, Alajuela provincia'}
                        images={[
                          'https://picsum.photos/200/300',
                          'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                          'https://picsum.photos/200/300',
                        ]}
                        showDropdown={true}
                        showEditButton={true}
                        numberOfDays={10}
                        numberOfViews={12}
                        numberOfFavorites={2}
                      />
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap mx-2'>
                {array.map((item, index) => {
                  if (likedIds.includes(index.toString()))
                    return (
                      <div className={`w-full sm:w-full md:w-1/3 px-1 pt-6`}>
                        <PropertyCard
                          key={index}
                          id={index.toString()}
                          price={'$55,000'}
                          sizeMeters={1.6}
                          fullWidth={true}
                          location={
                            'Alajuela provincia, Alajuela, Carrizal Costa'
                          }
                          secondLocation={'Rica, Alajuela provincia'}
                          images={[
                            'https://picsum.photos/200/300',
                            'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                            'https://picsum.photos/200/300',
                          ]}
                          status={index % 3}
                        />
                      </div>
                    );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <div className='flex flex-wrap mx-2'>
                {array.map((item, index) => {
                  return (
                    <div className={`w-full sm:w-full md:w-1/3 px-1 pt-6`}>
                      <PropertyCard
                        key={index}
                        id={index.toString()}
                        price={'$55,000'}
                        sizeMeters={1.6}
                        fullWidth={true}
                        location={
                          'Alajuela provincia, Alajuela, Carrizal Costa'
                        }
                        secondLocation={'Rica, Alajuela provincia'}
                        images={[
                          'https://picsum.photos/200/300',
                          'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                          'https://picsum.photos/200/300',
                        ]}
                        showDropdown={true}
                        showEditButton={true}
                        numberOfDays={10}
                        numberOfViews={12}
                        numberOfFavorites={2}
                      />
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
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
