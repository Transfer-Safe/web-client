import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x2aFA14aE7eeb12AF07844f096f8f2406a0D4599f';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
