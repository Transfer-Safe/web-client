import { useEffect, useState } from 'react';

import { useReadRouterFunction } from './useRouterFunction';

import { Invoice } from '../../models';

export const useGetInvoice = (invoiceId: string) => {
  const [invoice, setInvoice] = useState<Invoice | undefined>();

  const { data, ...invoiceFunction } = useReadRouterFunction('getInvoice', [
    invoiceId,
  ]);

  useEffect(() => {
    if (data) {
      Invoice.deserialize(data).then(setInvoice);
    }
  }, [data]);

  return {
    ...invoiceFunction,
    data: invoice,
  };
};
