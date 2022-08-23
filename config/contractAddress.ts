import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xDD8833D7FAe9A6d1769B290820f83E6Dc325475e';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
