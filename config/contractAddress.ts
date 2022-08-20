import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x394D884e3a2Dc5b526976aad85077C0A144e21f1';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
