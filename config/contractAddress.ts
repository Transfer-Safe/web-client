import { chain } from 'wagmi';

export const getRouterContractAddress = (chainId: number): string => {
  switch (chainId) {
    case chain.polygonMumbai.id:
      return '0xe01550Af21506D7479938E996ceeabA619Da4564';
    case 9000:
      return '0xfc348E32D0BA020262bB610677094329E9735665';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
