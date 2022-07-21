import { Mumbai } from '@usedapp/core';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case Mumbai.chainId:
      return '0x8d12c7B8cD47eC747D82242821490cC0382e5745';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
