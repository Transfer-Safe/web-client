import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { useContractRead } from 'wagmi';

import { useCurrentChain } from './useCurrentChain';

import { CURRENCIES_CHAINLINK_ADDRESSES } from '../config/currencies';
import { CurrencyCode } from '../models';
import {
  aggregatorV3InterfaceABI,
  AggregatorV3InterfaceResponse,
} from '../utils/chainlink';

export type GetExchangeRateResponse = ReturnType<typeof useContractRead> & {
  data?: AggregatorV3InterfaceResponse;
};

export type GetDecimalsResponse = ReturnType<typeof useContractRead> & {
  data?: number;
};

export const useGetExchangeRate = (
  currencyCode?: CurrencyCode,
): { rate: BigNumber; decimals: number } | undefined => {
  const currentChain = useCurrentChain();
  const address = useMemo(() => {
    if (currencyCode) {
      return CURRENCIES_CHAINLINK_ADDRESSES[currentChain.id].currencies[
        currencyCode
      ] as string;
    }
    return CURRENCIES_CHAINLINK_ADDRESSES[currentChain.id].native;
  }, [currentChain.id, currencyCode]);

  const latestRoundData = useContractRead({
    addressOrName: address,
    contractInterface: aggregatorV3InterfaceABI,
    functionName: 'latestRoundData',
  }) as GetExchangeRateResponse;
  const decimals = useContractRead({
    addressOrName: address,
    contractInterface: aggregatorV3InterfaceABI,
    functionName: 'decimals',
  }) as GetDecimalsResponse;

  return useMemo(() => {
    if (decimals.data && latestRoundData.data) {
      return {
        rate: latestRoundData.data.answer,
        decimals: decimals.data,
      };
    }
    return;
  }, [latestRoundData.data, decimals.data]);
};
