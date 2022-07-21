import { TransactionOptions, useContractFunction } from '@usedapp/core';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { RouterContact, useRouterContract } from './useRouterContract';

import { Invoice } from '../models';
import { createInvoiceAction } from '../store/creatingInvoice';

const useCreateInvoiceContractFunction = (options?: TransactionOptions) => {
  const contract = useRouterContract();
  return useContractFunction<RouterContact, 'createInvoice'>(
    contract,
    'createInvoice',
    options,
  );
};

export const useCreateInvoice = () => {
  const [invoice, setInvoice] = useState<Invoice | undefined>();
  const { send, state, resetState } = useCreateInvoiceContractFunction();
  const router = useRouter();
  const dispatch = useDispatch();

  const reset = useCallback(() => {
    resetState();
    setInvoice(undefined);
  }, [resetState]);

  const onTransactionMined = useCallback(() => {
    if (!invoice) {
      return;
    }
    dispatch(
      createInvoiceAction({
        invoice: invoice.serialize(),
        transcationHash: state.transaction?.hash,
      }),
    );
    router.push(`/invoices/${invoice.id}`);
  }, [router, invoice, state, dispatch]);

  useEffect(() => {
    switch (state.status) {
      case 'Success':
        onTransactionMined();
        break;
      default:
        break;
    }
  }, [state.status, state.errorMessage, onTransactionMined]);

  const create = useCallback(
    async (invoice: Invoice) => {
      reset();
      setInvoice(invoice);
      await send(invoice.serialize());
    },
    [send, reset],
  );
  return { create, state };
};
