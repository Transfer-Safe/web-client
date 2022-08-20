import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x4934012428317153Ef6737abF0a33d99Db5F71CE';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
