import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xB0a89C716ED27b99964158877CB7aA5B8cBfe5a1';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
