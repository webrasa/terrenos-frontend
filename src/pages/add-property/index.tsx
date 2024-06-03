import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { CheckboxWrap } from '@/checkbox-wrap';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import ImageUploader from '@/image-upload';
import { LandingSection } from '@/layouts/LandingSection';
import { Select } from '@/select/Select';
import { useCurrency } from '@/store/currencyContext';
import { useUnit } from '@/store/unitContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { currencies, getCurrency } from '@/utils/CurrencyConverter';
import { getUnit, units } from '@/utils/UnitConverter';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'add-property',
        'common',
        'index',
      ])),
    },
  };
}

const Index = () => {
  const { t } = useTranslation('common');
  const { unit, setUnit } = useUnit();
  const { currency, setCurrency } = useCurrency();

  const [unitObject, setUnitObject] = useState(units[0]);
  const [currencyObject, setCurrencyObject] = useState(currencies[0]);

  useEffect(() => {
    setUnit(getCookie('unit') || 'sqm');
    setCurrency(getCookie('currency') || 'usd');
  }, []);

  useEffect(() => {
    setUnitObject(getUnit(unit));
  }, [unit]);

  useEffect(() => {
    setCurrencyObject(getCurrency(currency));
  }, [currency]);

  return (
    <div className="antialiased">
      <Navbar translation={t} />
      <LandingSection yPadding="py-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-medium">Add a property</h1>
          <p>Fill out the fields below to add a property. </p>
          <div>
            <h2 className="mb-4 mt-8 font-medium">Location</h2>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="country">Country</Label>
                <FormElement>
                  <Select
                    value={0}
                    currentLabel="Country"
                    handleChange={() => console.log('handleChange')}
                    optionList={[]}
                  />
                </FormElement>
              </div>
              <div className="w-1/2">
                <Label htmlFor="province">Province or township</Label>
                <FormElement>
                  <Select
                    value={0}
                    currentLabel="Province or township"
                    handleChange={() => console.log('handleChange')}
                    optionList={[]}
                  />
                </FormElement>
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="address">Address (Optional)</Label>
              <FormElement>
                <input id="address" type="text" />
              </FormElement>
            </div>
            <h2 className="mb-4 mt-8 font-medium">Map</h2>
            <div className="flex w-full cursor-pointer flex-col border  border-gray-600 md:flex-row">
              <div className="w-full py-4 text-center text-gray-500 md:w-1/2">
                Click for approximate location
              </div>
              <div className="w-full bg-green-600 py-4 text-center text-white md:w-1/2">
                Draw for more precise location
              </div>
            </div>
            <div>MAPA</div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="latitude">Latitude</Label>
                <FormElement>
                  <input id="latitude" type="text" />
                </FormElement>
              </div>
              <div className="w-1/2">
                <Label htmlFor="longitude">Longitude</Label>
                <FormElement>
                  <input id="longitude" type="text" />
                </FormElement>
              </div>
            </div>
            <h2 className="mb-4 mt-8 font-medium">
              Property Information and Media
            </h2>
            <div className="mb-4">
              <Label htmlFor="price">
                Price ({currencyObject?.name} - {currencyObject?.symbol})
              </Label>
              <FormElement>
                <input id="price" type="text" />
              </FormElement>
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <FormElement>
                <textarea id="description"></textarea>
              </FormElement>
            </div>
            <div className="mb-4">
              <Label htmlFor={unitObject?.shortName}>
                Surface ({unitObject?.name} - {unitObject?.shortSymbol})
              </Label>
              <FormElement>
                <input id={unitObject?.shortName} type="text" />
              </FormElement>
            </div>
            <div className="mb-4">
              <Label htmlFor="tax">Property tax per month (Optional)</Label>
              <FormElement>
                <input id="tax" type="text" />
              </FormElement>
            </div>
            <div>
              <ImageUploader />
            </div>
            <h2 className="mt-8 font-medium">Attributes (Optional)</h2>
            <p className="mb-4 text-sm">Select all that apply</p>
            <CheckboxWrap
              itemsArray={[
                {
                  id: 1,
                  title: 'Geography',
                  items: [
                    { id: 1, name: 'Beachfront', value: 'beachfront' },
                    { id: 2, name: 'Island', value: 'island' },
                    { id: 3, name: 'Corner lot', value: 'corner-lot' },
                  ],
                },
                {
                  id: 2,
                  title: 'Land use',
                  items: [
                    { id: 4, name: 'Cattle ranch', value: 'cattle-ranch' },
                    { id: 5, name: 'Investment', value: 'investment' },
                    { id: 6, name: 'Chicken farm', value: 'chicken-farm' },
                  ],
                },
                {
                  id: 3,
                  title: 'Structures',
                  items: [
                    { id: 7, name: 'Cattle ranch', value: 'cattle-ranch' },
                    { id: 8, name: 'Investment', value: 'investment' },
                    { id: 9, name: 'Chicken farm', value: 'chicken-farm' },
                  ],
                },
                {
                  id: 4,
                  title: 'Improvements',
                  items: [
                    { id: 10, name: 'Cattle ranch', value: 'cattle-ranch' },
                    { id: 11, name: 'Investment', value: 'investment' },
                    { id: 12, name: 'Chicken farm', value: 'chicken-farm' },
                  ],
                },
              ]}
            />
            <div className="mt-4 flex justify-end gap-x-4">
              <div className="cursor-pointer rounded-md border border-gray-600 px-8 py-3">
                Save as draft
              </div>
              <div className="cursor-pointer rounded-md border border-gray-600 bg-green-600 px-8 py-3 text-white">
                Publish listing
              </div>
            </div>
          </div>
        </div>
      </LandingSection>
      <Footer />
    </div>
  );
};

export default Index;
