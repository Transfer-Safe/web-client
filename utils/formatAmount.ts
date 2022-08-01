import { BigNumberish, utils } from 'ethers';
import { Chain } from 'wagmi';

export const formatAmount = (amount: BigNumberish, chain: Chain) => {
  return [
    utils.formatUnits(amount, chain.nativeCurrency?.decimals),
    chain.nativeCurrency?.symbol || 'MATIC',
  ].join(' ');
};
