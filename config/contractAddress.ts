import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x4B8cDA45f68D64030E2D270cce5351648240ba4C';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
