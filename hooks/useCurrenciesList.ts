import { useMemo } from 'react';

import { useCurrentChain } from './useCurrentChain';

import { CURRENCIES, CURRENCIES_ADDRESSES } from '../config/currencies';
import { CryptoCurrency, CurrencyCode } from '../models';

export const useCurrenciesList = (): CryptoCurrency[] => {
  const currentChain = useCurrentChain();
  return useMemo(() => {
    const chainCurrenciesConfig = CURRENCIES_ADDRESSES[currentChain.id];
    if (!chainCurrenciesConfig) {
      throw new Error(`Chain ${currentChain.name} not supported`);
    }
    const availableCurrencies: CryptoCurrency[] = [];
    Object.entries(chainCurrenciesConfig).forEach(([code, address]) => {
      if (address) {
        availableCurrencies.push({
          ...CURRENCIES[code as CurrencyCode],
          address,
        });
      }
    });
    return availableCurrencies;
  }, [currentChain]);
};
