import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xDD8833D7FAe9A6d1769B290820f83E6Dc325475e';
    case 9000:
      return '0x95602643D97Dc3488551E05bb85884761800C18F';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
