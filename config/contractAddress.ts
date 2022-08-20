import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xf73b10f53B7ca18b142E716c31b194f15F601906';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
