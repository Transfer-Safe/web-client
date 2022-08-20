import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xE73a8213819f1D435b974926E0A13354f44E8533';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
