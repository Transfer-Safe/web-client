import {
  TransferSafeRouter,
  TransferSafeRouter__factory,
} from '@transfer-safe/router';
import { useContractRead, usePrepareContractWrite } from 'wagmi';

import { useRouterContractAddress } from './useRouterContractAddress';

export function useWriteRouterFunction<
  T extends keyof TransferSafeRouter['functions'],
>(functionName: T, args: Parameters<TransferSafeRouter['functions'][T]>) {
  const routerContractAddress = useRouterContractAddress();

  return usePrepareContractWrite({
    addressOrName: routerContractAddress,
    functionName: functionName,
    contractInterface: TransferSafeRouter__factory.abi,
    args,
  });
}

export type ReadContract<T> = ReturnType<typeof useContractRead> & {
  data?: Awaited<T>;
};

export function useReadRouterFunction<
  T extends keyof TransferSafeRouter['functions'],
>(
  functionName: T,
  args: Parameters<TransferSafeRouter['functions'][T]>,
): ReadContract<ReturnType<TransferSafeRouter[T]>> {
  const routerContractAddress = useRouterContractAddress();

  return useContractRead({
    addressOrName: routerContractAddress,
    functionName: functionName,
    contractInterface: TransferSafeRouter__factory.abi,
    args,
  }) as never;
}
