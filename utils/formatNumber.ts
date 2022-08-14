import { BigNumber, BigNumberish, constants } from 'ethers';
import numeral from 'numeral';

export const formatNumber = (
  value: BigNumberish,
  format = '0,0.[000]',
): string => {
  let numberValue: number | undefined;
  if (typeof value === 'number') {
    numberValue = value;
  } else {
    numberValue =
      BigNumber.from(value).div(constants.WeiPerEther.div(1000)).toNumber() /
      1000;
  }
  return numeral(numberValue).format(format);
};
