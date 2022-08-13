import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xAc34089203771A96dD12787B6B9cb8c9f98D07CB';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
