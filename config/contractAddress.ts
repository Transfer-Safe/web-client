import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x7C45e4fe42b5c72f9411934c535a955BF9b6EEe8';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
