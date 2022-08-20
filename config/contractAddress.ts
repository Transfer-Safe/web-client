import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x0111229E61dd38061C54fEC06537598116F878DE';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
