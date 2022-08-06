import { useMemo } from 'react';
import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

import { Invoice } from '../models';

export const useCreateInvoice = (invoice: Invoice) => {
  const invoiceData = useMemo(() => invoice.serialize(), [invoice]);
  const { config } = useWriteRouterFunction('createInvoice', [invoiceData]);

  return useContractWrite(config);
};
