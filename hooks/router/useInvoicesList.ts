import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import {
  ReadFunctionOptions,
  useReadRouterFunction,
} from './useRouterFunction';

import { Invoice } from '../../models';

export const useInvoicesList = (
  address: string,
  take = 20,
  skip = 0,
  options?: ReadFunctionOptions,
) => {
  const invoicesList = useReadRouterFunction(
    'listInvoices',
    [address, BigNumber.from(take), BigNumber.from(skip)],
    options,
  );
  const [invoices, setInvoices] = useState<Invoice[] | undefined>();

  useEffect(() => {
    if (invoicesList.data) {
      Promise.all(
        invoicesList.data.map((invoice) => Invoice.deserialize(invoice)),
      ).then(setInvoices);
    }
  }, [invoicesList.data]);

  return {
    ...invoicesList,
    data: invoices,
  };
};
