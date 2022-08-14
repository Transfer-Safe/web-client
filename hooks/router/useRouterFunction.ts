import {
  TransferSafeRouter,
  TransferSafeRouter__factory,
} from '@transfer-safe/router';
import { useContractRead, usePrepareContractWrite } from 'wagmi';
import {
  UsePrepareContractWriteArgs,
  UsePrepareContractWriteConfig,
} from 'wagmi/dist/declarations/src/hooks/contracts/usePrepareContractWrite';

import { useRouterContractAddress } from './useRouterContractAddress';

type PrepareWriteContractOptions = Omit<
  UsePrepareContractWriteArgs & UsePrepareContractWriteConfig,
  'addressOrName' | 'functionName' | 'contractInterface' | 'args'
>;

export interface ReadFunctionOptions {
  watch?: boolean;
}

export function useWriteRouterFunction<
  T extends keyof TransferSafeRouter['functions'],
>(
  functionName: T,
  args: Parameters<TransferSafeRouter['functions'][T]>,
  options?: PrepareWriteContractOptions,
) {
  const routerContractAddress = useRouterContractAddress();

  return usePrepareContractWrite({
    addressOrName: routerContractAddress,
    functionName: functionName,
    contractInterface: TransferSafeRouter__factory.abi,
    args,
    ...options,
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
  options: ReadFunctionOptions = {},
): ReadContract<ReturnType<TransferSafeRouter[T]>> {
  const routerContractAddress = useRouterContractAddress();

  return useContractRead({
    addressOrName: routerContractAddress,
    functionName: functionName,
    contractInterface: TransferSafeRouter__factory.abi,
    args,
    ...options,
  }) as never;
}
