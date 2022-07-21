import { useCall } from '@usedapp/core';
import { useEffect, useMemo, useState } from 'react';

import { useRouterContract } from './useRouterContract';

import { Invoice } from '../models';

export const useGetInvoice = (invoiceId: string) => {
  const contract = useRouterContract();
  const [invoice, setInvoice] = useState<Invoice | undefined>();

  const data = useCall(
    {
      contract,
      method: 'getInvoice',
      args: [invoiceId],
    },
    { refresh: 'everyBlock' },
  );

  useEffect(() => {
    if (data?.value?.[0]) {
      Invoice.deserialize(data.value[0]).then(setInvoice);
    }
  }, [data]);

  const loading = useMemo(
    () => !invoice && !data?.error,
    [data?.error, invoice],
  );

  return { invoice, error: data?.error, loading };
};
