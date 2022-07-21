import { TransactionOptions, useContractFunction } from '@usedapp/core';
import { useCallback } from 'react';

import { RouterContact, useRouterContract } from './useRouterContract';

import { Invoice } from '../models';

const useDepositContractFunction = (options?: TransactionOptions) => {
  const contract = useRouterContract();
  return useContractFunction<RouterContact, 'deposit'>(
    contract,
    'deposit',
    options,
  );
};

export const useDepositInvoice = () => {
  const depositContractFunction = useDepositContractFunction();

  const send = useCallback(
    async (invoice: Invoice) => {
      await depositContractFunction.send(invoice.id, {
        value: invoice.amount,
      });
    },
    [depositContractFunction],
  );

  const loading = ['Mining', 'PendingSignature'].includes(
    depositContractFunction.state.status,
  );
  const error = depositContractFunction.state.errorMessage;

  return { send, state: depositContractFunction.state, loading, error };
};
