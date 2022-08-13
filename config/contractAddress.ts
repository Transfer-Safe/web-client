import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x87b62683d44b99B1A23cEA10A3Bb3D735E39C1d9';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
