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
import { getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const Index = () => {
  const { t } = useTranslation('index');
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
            <h2 className="font-medium mt-8 mb-4">Location</h2>
            <div className="flex gap-4 mb-4">
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
            <h2 className="font-medium mt-8 mb-4">Map</h2>
            <div className="flex w-full md:flex-row flex-col border  cursor-pointer border-gray-600">
              <div className="w-full md:w-1/2 text-center text-gray-500 py-4">
                Click for approximate location
              </div>
              <div className="w-full md:w-1/2 text-center bg-green-600 text-white py-4">
                Draw for more precise location
              </div>
            </div>
            <div>MAPA</div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="latitude">Latitude</Label>
                <FormElement>
                  <Select
                    value={0}
                    currentLabel="Latitude"
                    handleChange={() => console.log('handleChange')}
                    optionList={[]}
                  />
                </FormElement>
              </div>
              <div className="w-1/2">
                <Label htmlFor="longitude">Longitude</Label>
                <FormElement>
                  <Select
                    value={0}
                    currentLabel="Longitude"
                    handleChange={() => console.log('handleChange')}
                    optionList={[]}
                  />
                </FormElement>
              </div>
            </div>
            <h2 className="font-medium mt-8 mb-4">
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
            <h2 className="font-medium mt-8">Attributes (Optional)</h2>
            <p className="mb-4 text-sm">Select all that apply</p>
            <CheckboxWrap
              itemsArray={[
                {
                  id: 1,
                  title: 'Geography',
                  items: [
                    { id: 1, name: 'Beachfront', value: 'beachfront' },
                    { id: 1, name: 'Island', value: 'island' },
                    { id: 1, name: 'Corner lot', value: 'corner-lot' },
                  ],
                },
                {
                  id: 2,
                  title: 'Land use',
                  items: [
                    { id: 1, name: 'Cattle ranch', value: 'cattle-ranch' },
                    { id: 1, name: 'Investment', value: 'investment' },
                    { id: 1, name: 'Chicken farm', value: 'chicken-farm' },
                  ],
                },
                {
                  id: 3,
                  title: 'Structures',
                  items: [
                    { id: 1, name: 'Cattle ranch', value: 'cattle-ranch' },
                    { id: 1, name: 'Investment', value: 'investment' },
                    { id: 1, name: 'Chicken farm', value: 'chicken-farm' },
                  ],
                },
                {
                  id: 4,
                  title: 'Improvements',
                  items: [
                    { id: 1, name: 'Cattle ranch', value: 'cattle-ranch' },
                    { id: 1, name: 'Investment', value: 'investment' },
                    { id: 1, name: 'Chicken farm', value: 'chicken-farm' },
                  ],
                },
              ]}
            />
            <div className="flex justify-end gap-x-4 mt-4">
              <div className="border border-gray-600 rounded-md px-8 py-3 cursor-pointer">
                Save as draft
              </div>
              <div className="border border-gray-600 rounded-md px-8 py-3 cursor-pointer bg-green-600 text-white">
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
