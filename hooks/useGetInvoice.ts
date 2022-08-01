import { useReadRouterFunction } from './useRouterFunction';

export const useGetInvoice = (invoiceId: string) => {
  return useReadRouterFunction('getInvoice', [invoiceId]);
};
