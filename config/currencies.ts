import { Mumbai } from '@usedapp/core';

import { CryptoCurrency, CurrencyCode } from '../models';

type ChainCurrencies = Record<CurrencyCode, string | undefined>;

export const CURRENCIES: Record<
  CurrencyCode,
  Omit<CryptoCurrency, 'address'>
> = {
  [CurrencyCode.DAI]: {
    code: CurrencyCode.DAI,
  },
  [CurrencyCode.USDT]: {
    code: CurrencyCode.USDT,
  },
};

export const CURRENCIES_ADDRESSES: Record<number, ChainCurrencies> = {
  [Mumbai.chainId]: {
    [CurrencyCode.DAI]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    [CurrencyCode.USDT]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
};
