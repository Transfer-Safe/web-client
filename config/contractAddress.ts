import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x4b35b0Ffb9866a8338fc88474fAef6EA6fb3a2dF';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
