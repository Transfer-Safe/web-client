import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x7f5C140346EF1809BA7d663f0e3149820E7EA677';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
