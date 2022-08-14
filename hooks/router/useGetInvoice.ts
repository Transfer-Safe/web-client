import { useEffect, useState } from 'react';

import {
  ReadFunctionOptions,
  useReadRouterFunction,
} from './useRouterFunction';

import { Invoice } from '../../models';

export const useGetInvoice = (
  invoiceId: string,
  options?: ReadFunctionOptions,
) => {
  const [invoice, setInvoice] = useState<Invoice | undefined>();

  const { data, ...invoiceFunction } = useReadRouterFunction(
    'getInvoice',
    [invoiceId],
    options,
  );

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
