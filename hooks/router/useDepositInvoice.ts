import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useDepositInvoice = (invoiceId: string) => {
  const { config } = useWriteRouterFunction('deposit', [invoiceId]);
  return useContractWrite(config);
};
