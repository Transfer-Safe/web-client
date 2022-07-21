import { Mumbai } from '@usedapp/core';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case Mumbai.chainId:
      return '0xEfcbb23d3B5315A6A825DefA4b9D97028E1dD204';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
