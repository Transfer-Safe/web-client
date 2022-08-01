import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

import { Invoice } from '../models';

export const useCreateInvoice = (invoice: Invoice) => {
  const config = useWriteRouterFunction('createInvoice', [invoice.serialize()]);

  return useContractWrite(config);
};
