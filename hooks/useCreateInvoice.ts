import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';
import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useCreateInvoice = (invoice: InvoiceStruct) => {
  const { config } = useWriteRouterFunction('createInvoice', [invoice]);

  return useContractWrite(config);
};
