import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x857832404a1323d2A8666a80BB28FB85CBD8A544';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
