import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x8d12c7B8cD47eC747D82242821490cC0382e5745';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
