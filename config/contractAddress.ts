import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0x9bDd14F2fa9D2aD5583D9fE0d8b8EDc5F9180f96';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
