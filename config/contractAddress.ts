import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xe01550Af21506D7479938E996ceeabA619Da4564';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
