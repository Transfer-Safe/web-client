import { BigNumber } from 'ethers';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { useRouterContractAddress } from '../router';

export const useSendErc20 = (
  token: string,
  amount: BigNumber = BigNumber.from('100000000000000000'),
) => {
  const routerAddress = useRouterContractAddress();

  const { config } = usePrepareContractWrite({
    addressOrName: token,
    contractInterface: erc20ABI,
    functionName: 'transfer',
    args: [routerAddress, amount],
    onError: console.warn,
  });

  return useContractWrite(config);
};
