/* eslint-disable camelcase */
import { TransactionOptions, useContractFunction } from '@usedapp/core';

import { useRouterContract } from './useRouterContract';

export const useCreateInvoice = (options?: TransactionOptions) => {
  const contract = useRouterContract();
  return useContractFunction(contract, 'createInvoice', options);
};
