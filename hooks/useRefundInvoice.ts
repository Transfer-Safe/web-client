import { TransactionOptions, useContractFunction } from '@usedapp/core';
import { useCallback } from 'react';

import { RouterContact, useRouterContract } from './useRouterContract';

import { Invoice } from '../models';

export const useRefundInvoiceContractFunction = (
  options?: TransactionOptions,
) => {
  const contract = useRouterContract();
  return useContractFunction<RouterContact, 'refundInvoice'>(
    contract,
    'refundInvoice',
    options,
  );
};

export const useRefundInvoice = () => {
  const refundFunction = useRefundInvoiceContractFunction();

  const send = useCallback(
    async (invoice: Invoice) => {
      await refundFunction.send(invoice.id);
    },
    [refundFunction],
  );

  const loading = ['Mining', 'PendingSignature'].includes(
    refundFunction.state.status,
  );
  const error = refundFunction.state.errorMessage;

  return { send, loading, error };
};
