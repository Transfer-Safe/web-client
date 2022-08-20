import { BigNumber, utils } from 'ethers';
import { useEffect, useState } from 'react';

import { useReadRouterFunction } from '.';

export const useGetFee = (amount: number) => {
  const getFee = useReadRouterFunction('getFee', []);
  const [fee, setFee] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (getFee.data) {
      const amountInWei = utils.parseEther(amount.toString());
      setFee(amountInWei.mul(getFee.data).div(1000));
    }
  }, [getFee.data, amount]);

  return {
    ...getFee,
    amount: fee,
  };
};
