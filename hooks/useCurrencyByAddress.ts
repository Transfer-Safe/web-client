import { useCallback } from 'react';

import { useCurrenciesList } from './useCurrenciesList';

export const useCurrencyByAddress = () => {
  const currencies = useCurrenciesList();

  return useCallback(
    (currencyAddress: string) => {
      const currency = currencies.find(
        (currency) =>
          currency.address.toLocaleLowerCase() ===
          currencyAddress.toLocaleLowerCase(),
      );
      if (!currency) {
        throw new Error(
          `Currency with address ${currencyAddress} not supported`,
        );
      }
      return currency;
    },
    [currencies],
  );
};
