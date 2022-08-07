import { BigNumber, BigNumberish, constants } from 'ethers';
import { useMemo } from 'react';

import { useGetExchangeRate } from './useGetExchangeRate';

export const useConvertToUsd = (
  value: BigNumberish,
  currency?: string,
): BigNumber | undefined => {
  const data = useGetExchangeRate(currency);
  return useMemo(() => {
    if (!data) {
      return;
    }
    return data.mul(BigNumber.from(value).div(constants.WeiPerEther));
  }, [data, value]);
};
