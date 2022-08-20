import { BigNumber, BigNumberish } from 'ethers';
import { useMemo } from 'react';

import { useGetExchangeRate } from './useGetExchangeRate';

import { CurrencyCode } from '../models';

export const useConvertToUsd = (
  value: BigNumberish,
  currency?: CurrencyCode,
): BigNumber | undefined => {
  const data = useGetExchangeRate(currency);
  return useMemo(() => {
    if (!data) {
      return;
    }
    const { rate, decimals } = data;
    return BigNumber.from(value)
      .mul(rate)
      .div(BigNumber.from(10).pow(decimals));
  }, [data, value]);
};
