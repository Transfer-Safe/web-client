import { Mumbai } from '@usedapp/core';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case Mumbai.chainId:
      return '0x4e65BddF5b3D31157F97FA9eC12e859D03707709';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
