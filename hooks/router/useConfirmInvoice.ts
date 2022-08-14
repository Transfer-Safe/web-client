import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useConfirmInvoice = (invoiceId: string) => {
  const { config } = useWriteRouterFunction('confirmInvoice', [invoiceId]);
  return useContractWrite(config);
};
