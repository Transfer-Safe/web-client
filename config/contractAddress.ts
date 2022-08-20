import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x165c02907c40F2f8618503b43cCB6449DbFa2FAE';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
