import { BigNumber } from 'ethers';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

export const useGetTokenBalance = (token: string) => {
  const account = useAccount();

  const { data, ...getBalance } = useContractRead({
    addressOrName: token,
    contractInterface: erc20ABI,
    functionName: 'balanceOf',
    args: [account.address],
  });
  return {
    ...getBalance,
    data: data as unknown as BigNumber,
  };
};
