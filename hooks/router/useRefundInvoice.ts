import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useRefundInvoice = (invoiceId: string) => {
  const { config } = useWriteRouterFunction('refundInvoice', [invoiceId]);

  return useContractWrite(config);
};
