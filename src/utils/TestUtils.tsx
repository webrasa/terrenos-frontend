// This file is only used in testing environment. So, we can disable import/no-extraneous-dependencies rule.
/* eslint-disable import/no-extraneous-dependencies */
import type { ITestingAuthProviderProps } from '__mocks__/UseAuth';
import { TestingAuthProvider } from '__mocks__/UseAuth';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import axios from 'axios';
import type { ReactElement } from 'react';
import { SWRConfig } from 'swr';

export const authProviderRender = (
  ui: ReactElement,
  authOptions?: Omit<ITestingAuthProviderProps, 'children'>,
  renderOptions?: RenderOptions
) =>
  render(
    <TestingAuthProvider {...authOptions}>{ui}</TestingAuthProvider>,
    renderOptions
  );

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const swrConfigRender = (
  ui: ReactElement,
  renderOptions?: RenderOptions
) =>
  render(
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher,
        dedupingInterval: 0,
      }}
    >
      {ui}
    </SWRConfig>,
    renderOptions
  );
