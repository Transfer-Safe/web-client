import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xE14f25895B5647f97aE6f2B36298B2f59846E4e0';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
