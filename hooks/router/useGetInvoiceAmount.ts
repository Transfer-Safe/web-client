import { useReadRouterFunction } from '.';

export const useGetInvoiceAmountInCurrency = (
  invoiceId: string,
  token: string,
) => {
  return useReadRouterFunction('amountInCurrency', [invoiceId, token]);
};

export const useGetInvoiceAmountInNativeCurrency = (invoiceId: string) => {
  return useReadRouterFunction('amountInNativeCurrency', [invoiceId]);
};
