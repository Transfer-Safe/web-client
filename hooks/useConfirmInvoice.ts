import { TransactionOptions, useContractFunction } from '@usedapp/core';
import { useCallback } from 'react';

import { RouterContact, useRouterContract } from './useRouterContract';

import { Invoice } from '../models';

export const useConfirmInvoiceContractFunction = (
  options?: TransactionOptions,
) => {
  const contract = useRouterContract();
  return useContractFunction<RouterContact, 'confirmInvoice'>(
    contract,
    'confirmInvoice',
    options,
  );
};

export const useConfirmInvoice = () => {
  const confirmInvoiceContractFunction = useConfirmInvoiceContractFunction();

  const send = useCallback(
    async (invoice: Invoice) => {
      await confirmInvoiceContractFunction.send(invoice.id);
    },
    [confirmInvoiceContractFunction],
  );

  const loading = ['Mining', 'PendingSignature'].includes(
    confirmInvoiceContractFunction.state.status,
  );
  const error = confirmInvoiceContractFunction.state.errorMessage;

  return { send, state: confirmInvoiceContractFunction.state, loading, error };
};
