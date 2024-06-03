import { Menu, Transition } from '@headlessui/react';
import type { CookieValueTypes } from 'cookies-next';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { MenuDropdownItem } from './MenuDropdownItem';
import { useUnit } from '@/store/unitContext';
import { useCurrency } from '@/store/currencyContext';

export default function DropdownMenu() {
  const [customOpen, setCustomOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<CookieValueTypes>('en');
  const [selectedCurrency, setSelectedCurrency] =
    useState<CookieValueTypes>('usd');
  const [selectedUnit, setSelectedUnit] = useState<CookieValueTypes>('sqm');
  const { setUnit } = useUnit();
  const { setCurrency } = useCurrency();

  function buttonClicked() {
    setCustomOpen((prev: boolean) => !prev);
    if (!customOpen) {
      if (hasCookie('language')) {
        setSelectedLanguage(getCookie('language'));
      }
      if (hasCookie('currency')) {
        setSelectedCurrency(getCookie('currency'));
      }
      if (hasCookie('unit')) {
        setSelectedUnit(getCookie('unit'));
      }
    }
  }
  return (
    <div className="z-50 w-10 ">
      <Menu as="div">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                onClick={buttonClicked}
                className="inline-flex justify-center rounded-1.5xl border border-gray-300 px-4 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-white/50 focus:outline-none">
                <div className="p-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/favorites"
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      >
                        My favorites
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/properties"
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      >
                        Manage properties
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/inbox"
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      >
                        Inbox
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/account"
                        className={`${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md p-2 text-sm`}
                      >
                        Account
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1">
                  <MenuDropdownItem
                    onChangeHandler={(val) => {
                      setCookie('language', val.target.value);
                      setSelectedLanguage(val.target.value);
                    }}
                    items={[
                      { value: 'en', name: 'English' },
                      { value: 'es', name: 'Spanish' },
                    ]}
                    selected={selectedLanguage}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    }
                    id="languageDropdown"
                  ></MenuDropdownItem>
                  <MenuDropdownItem
                    onChangeHandler={(val) => {
                      setCookie('currency', val.target.value);
                      setSelectedCurrency(val.target.value);
                      setCurrency(val.target.value);
                    }}
                    items={[
                      { value: 'usd', name: 'USD' },
                      { value: 'eur', name: 'EUR' },
                      { value: 'rsd', name: 'RSD' },
                    ]}
                    selected={selectedCurrency}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                    }
                    id="currencyDropdown"
                  ></MenuDropdownItem>
                  <MenuDropdownItem
                    onChangeHandler={(val) => {
                      setCookie('unit', val.target.value);
                      setSelectedUnit(val.target.value);
                      setUnit(val.target.value);
                    }}
                    items={[
                      { value: 'acres', name: 'Acres' },
                      { value: 'sqm', name: 'Square meters' },
                      { value: 'hectares', name: 'Hectares' },
                    ]}
                    selected={selectedUnit}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                        />
                      </svg>
                    }
                    id="unitDropdown"
                  ></MenuDropdownItem>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
