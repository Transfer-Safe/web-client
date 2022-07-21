import { Chain } from '@usedapp/core';
import { BigNumberish, utils } from 'ethers';

export const formatAmount = (amount: BigNumberish, chain: Chain) => {
  return [
    utils.formatUnits(amount, chain.nativeCurrency?.decimals),
    chain.nativeCurrency?.symbol || 'MATIC',
  ].join(' ');
};
